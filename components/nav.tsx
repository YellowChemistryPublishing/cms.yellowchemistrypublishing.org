"use client";

import { JSX, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProfileDropdown from "./profile-dropdown";
import { ReactState } from "./state";
import { UserProfile } from "./user_profile";

export default function Nav(props: { hideProfileMarkup?: boolean }): JSX.Element {
    const loggedOutProfileMarkup = (redirBack: boolean = true): JSX.Element => {
        return (
            <Link className="button brt" href={`/login${redirBack ? `?redir=${window.location.pathname}` : ""}`}>
                <Image src="res/user-plus.svg" alt="User Icon" width={20} height={20} style={{ verticalAlign: "-0.2em", display: "inline", width: "auto", height: "1.2em" }} />
                &nbsp;
                <b>Login Here!</b>
            </Link>
        );
    };
    const [profileMarkup, setProfileMarkup]: ReactState<JSX.Element> = useState(loggedOutProfileMarkup(false));

    useEffect(() => {
        if (!props.hideProfileMarkup) {
            const effect = async (): Promise<void> => {
                const profile: UserProfile = new UserProfile(true);
                if (!profile.empty()) {
                    try {
                        if (!profile.resolved()) {
                            await profile.fetchAssignUserData();
                            profile.sync();
                        }
                        setProfileMarkup(<ProfileDropdown profile={profile} />);
                    } catch {
                        setProfileMarkup(loggedOutProfileMarkup(true));
                    }
                } else setProfileMarkup(loggedOutProfileMarkup(true));
            };
            effect().catch((ex: unknown): void => {
                console.error(ex);
                setProfileMarkup(loggedOutProfileMarkup(true));
            });
        }
    }, [props.hideProfileMarkup]);

    return (
        <nav className="accent-color-2" style={{ zIndex: 1337, position: "sticky", top: 0, left: 0, width: "100%" }}>
            <style jsx>{`
                :global(nav a),
                :global(nav button) {
                    font-size: large;
                }
            `}</style>
            <noscript>
                <p className="nav-box">
                    <b>
                        This page <em>definitely</em> won&apos;t work without JavaScript!
                    </b>
                </p>
            </noscript>
            <div className="nav-box" style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", flexWrap: "wrap" }}>
                <Link className="unstyled" href="/" style={{ display: "block", marginRight: "auto" }}>
                    <h1 style={{ textAlign: "left" }}>
                        <Image
                            src="/shared-common/res/Yellow Chemistry Research Logo (Light).svg"
                            alt="Yellow Chemistry Research Logo"
                            width={20}
                            height={20}
                            style={{ verticalAlign: "middle", display: "inline", width: "auto", height: "1.5em" }}
                        />
                        &nbsp;
                        <span style={{ display: "inline-block" }}>cms @&nbsp;</span>
                        <span style={{ display: "inline-block" }}>Yellow Chemistry Publishing</span>
                    </h1>
                </Link>
                {!props.hideProfileMarkup ? profileMarkup : null}
            </div>
            <hr className="accent-color-bg-1" />
        </nav>
    );
}
