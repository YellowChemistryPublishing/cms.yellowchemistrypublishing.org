"use client";

import { useEffect, useState } from "react";
import { isExpectingRedirect, UserProfile } from "../user_profile";
import ButtonSSOGitHub from "./github";

export function SignInPageContent() {
    const [markup, setMarkup] = useState(<></>);

    useEffect(() => {
        const effect = async () => {
            const profile: UserProfile = new UserProfile();
            if (!profile.empty() && !profile.resolved()) {
                await profile.fetchAssignUserData();
                profile.sync();
            }

            if (!isExpectingRedirect()) {
                setMarkup(
                    <>
                        <h2 style={{ alignSelf: "flex-start" }}>Login with...</h2>
                        <ButtonSSOGitHub />
                    </>
                );
            } else
                setMarkup(
                    <>
                        <p style={{ alignSelf: "flex-start" }}>Hang on, you&apos;re being redirected!</p>
                        <ButtonSSOGitHub />
                    </>
                );
        };
        effect();
    }, []);

    return markup;
}
