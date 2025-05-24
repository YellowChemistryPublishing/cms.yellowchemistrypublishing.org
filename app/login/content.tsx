"use client";

import { isExpectingRedirect, UserProfile } from "../../components/user_profile";
import { JSX, useEffect, useState } from "react";
import Image from "next/image";
import { ReactState } from "../../components/state";
import { ShouldRedirect } from "../../components/should_redirect";
import { v4 as uuidv4 } from "uuid";

function oauth2WithGitHub(): void {
    const clientID: string = "Ov23liHccCCFfBivxT9D";
    const redirectUrl: string = window.location.protocol + "//" + window.location.host + "/login";
    const scope: string = "read:user,user:email";

    const authUrl: string = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectUrl}&scope=${scope}`;

    new ShouldRedirect(new URLSearchParams(window.location.search).get("redir")).sync();
    window.location.href = authUrl;
}

export function SignInPageContent(): JSX.Element {
    const defaultMarkup = (onClickNoOp: boolean = false): JSX.Element => (
        <>
            <h2 style={{ alignSelf: "flex-start" }}>Login with...</h2>
            <button className="brm ptm prm pbm plm" onClick={onClickNoOp ? undefined : oauth2WithGitHub} style={{ fontSize: "xx-large" }}>
                <Image className="inline-logo" src="res/github.svg" alt="GitHub Logo" width={20} height={20} />
                &nbsp; Single Sign-On (GitHub)
            </button>
        </>
    );
    const [markup, setMarkup]: ReactState<JSX.Element> = useState(defaultMarkup(true));

    useEffect(() => {
        const effect = async (): Promise<void> => {
            const profile: UserProfile = new UserProfile(true);
            if (!profile.empty() && !profile.resolved()) {
                await profile.fetchAssignUserData();
                profile.sync();
                new ShouldRedirect(new URLSearchParams(window.location.search).get("redir") ?? undefined).redirectRegardless();
                return;
            }
            if (profile.resolved()) {
                new ShouldRedirect(new URLSearchParams(window.location.search).get("redir") ?? undefined).redirectRegardless();
                return;
            }
            if (!isExpectingRedirect()) {
                setMarkup(defaultMarkup(false));
                return;
            }

            setMarkup(<p style={{ alignSelf: "flex-start" }}>Hang on, you&apos;re being redirected!</p>);

            try {
                const code: string | null = new URLSearchParams(window.location.search).get("code");
                if (!code) throw Error("Assertion failed: `code` is null, please log in again.");

                const res: Response = await fetch(`https://api.yellowchemistrypublishing.org/iam?code=${code}&state=${uuidv4()}`);
                if (!res.ok) {
                    profile.clear();
                    profile.sync();
                    throw Error(`Invalid login code, please log in again. (\`code\` was ${code}, response was "${await res.text()}".)`);
                }

                const data: { tokenType: string; token: string; userData: { login: string } } = await (async (): Promise<{
                    tokenType: string;
                    token: string;
                    userData: { login: string };
                }> => {
                    try {
                        return (await res.json()) as unknown as { tokenType: string; token: string; userData: { login: string } };
                    } catch {
                        throw Error(`Failed to parse JSON response, please log in again. (\`res.body\` was ${await res.text()}.)`);
                    }
                })();
                profile.loginToken = `${data.tokenType} ${data.token}`;
                profile.type = "gh";
                profile.displayName = data.userData.login;
                profile.data = data.userData;
                profile.sync();

                const redir: ShouldRedirect = new ShouldRedirect();
                new ShouldRedirect(null).sync();
                redir.redirectRegardless();
            } catch (ex) {
                console.error(ex);

                profile.clear();
                profile.sync();

                setMarkup(defaultMarkup(false));
            }
        };
        effect().catch((ex: unknown): void => {
            console.error(ex);
            setMarkup(defaultMarkup(false));
        });
    }, []);

    return markup;
}
