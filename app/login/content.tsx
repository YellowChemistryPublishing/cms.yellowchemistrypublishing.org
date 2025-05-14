"use client";

import { useEffect, useState } from "react";
import { isExpectingRedirect, UserProfile } from "../../components/user_profile";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { ShouldRedirect } from "../../components/should_redirect";

function oauth2WithGitHub(): void {
    const clientID = "Ov23liHccCCFfBivxT9D";
    const redirectUrl = window.location.protocol + "//" + window.location.host + "/login";
    const scope = "read:user,user:email";

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectUrl}&scope=${scope}`;

    new ShouldRedirect(new URLSearchParams(window.location.search).get("redir")).sync();
    window.location.href = authUrl;
}

export function SignInPageContent() {
    const defaultMarkup = (onClickNoOp: boolean = false) => (
        <>
            <h2 style={{ alignSelf: "flex-start" }}>Login with...</h2>
            <button className="brm ptm prm pbm plm" onClick={onClickNoOp ? undefined : oauth2WithGitHub} style={{ fontSize: "xx-large" }}>
                <Image src="res/github.svg" alt="GitHub Logo" width={20} height={20} style={{ verticalAlign: "-0.2em", display: "inline", width: "auto", height: "1.2em" }} />
                &nbsp; Single Sign-On (GitHub)
            </button>
        </>
    );
    const [markup, setMarkup] = useState(defaultMarkup(true));

    useEffect(() => {
        const effect = async () => {
            const profile: UserProfile = new UserProfile();
            if (!profile.empty() && !profile.resolved()) {
                await profile.fetchAssignUserData();
                profile.sync();
            }

            if (!isExpectingRedirect()) {
                setMarkup(defaultMarkup(false));
            } else {
                setMarkup(<p style={{ alignSelf: "flex-start" }}>Hang on, you&apos;re being redirected!</p>);

                try {
                    const code: string | null = new URLSearchParams(window.location.search).get("code");
                    if (code) {
                        const res = await fetch(`https://api.yellowchemistrypublishing.org/iam?code=${code}&state=${uuidv4()}`);
                        if (!res.ok) {
                            profile.clear();
                            profile.sync();
                            await Promise.reject(`Invalid login code, please log in again. (\`code\` was ${code}, response was "${await res.text()}".)`);
                        }

                        const data = await (async () => {
                            try {
                                return await (res.json() as unknown as { tokenType: string; token: string; userData: { login: string } });
                            } catch {
                                throw await Promise.reject(`Failed to parse JSON response, please log in again. (\`res.body\` was ${res.body}.)`);
                            }
                        })();
                        profile.loginToken = `${data.tokenType} ${data.token}`;
                        profile.type = "gh";
                        profile.displayName = data.userData.login;
                        profile.data = data.userData;
                        profile.sync();

                        const redir = new ShouldRedirect();
                        new ShouldRedirect(null).sync();
                        redir.redirectRegardless();
                    } else await Promise.reject("Assertion failed: `code` is null, please log in again.");
                } catch (ex) {
                    console.error(ex);

                    profile.clear();
                    profile.sync();

                    new ShouldRedirect(window.location.pathname).redirectRegardless();
                }
            }
        };
        effect();
    }, []);

    return markup;
}
