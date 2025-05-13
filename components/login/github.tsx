"use client";

import Image from "next/image";
import { useEffect } from "react";
import { UserProfile } from "./common";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams } from "next/navigation";

function oauth2WithGitHub(): void {
    const clientID = "Ov23liHccCCFfBivxT9D";
    const redirectUrl = window.location.protocol + "//" + window.location.host + "/login";
    const scope = "read:user";

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectUrl}&scope=${scope}`;

    const redir = new URLSearchParams(window.location.href).get("redir");
    if (redir) localStorage.setItem("redir", redir);
    window.location.href = authUrl;
}

export default function ButtonSSOGitHub() {
    const code: string | null = useSearchParams().get("code");

    useEffect(() => {
        const effect = async () => {
            const profile: UserProfile = new UserProfile();
            if (profile.empty() && code) {
                const res = await fetch(`https://api.yellowchemistrypublishing.org/iam?code=${code}&state=${uuidv4()}`);
                const data = await res.json();
                if (!res.ok) {
                    profile.clear();
                    profile.sync();
                    await Promise.reject(`Invalid login code, please log in again. (\`code\` was ${code}, response was ${res.status}: ${data.message ?? "[empty]"}.)`);
                }

                profile.loginToken = `${data.tokenType} ${data.token}`;
                profile.type = "gh";
                profile.displayName = data.userData.login;
                profile.data = data.userData;
                profile.sync();

                const redir = localStorage.getItem("redir");
                if (redir) {
                    localStorage.removeItem("redir");
                    window.location.href = window.location.protocol + "//" + window.location.host + redir;
                } else window.location.href = window.location.protocol + "//" + window.location.host;
            }
        };
        effect();
    }, [code]);

    if (!code)
        return (
            <button className="brm ptm prm pbm plm" onClick={oauth2WithGitHub} style={{ fontSize: "xx-large" }}>
                <Image src="res/github.svg" alt="GitHub Logo" width={20} height={20} style={{ verticalAlign: "-0.2em", display: "inline", width: "auto", height: "1.2em" }} />
                &nbsp; Single Sign-On (GitHub)
            </button>
        );
}
