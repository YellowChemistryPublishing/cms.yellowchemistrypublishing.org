"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserProfile } from "../app/user_profile";
import ProfileDropdown from "./profile-dropdown";

export default function Nav(props) {
    const [profileMarkup, setProfileMarkup] = useState(<></>);

    const setLoggedOutProfileMarkup = () => {
        setProfileMarkup(
            <Link className="button brt" href={`/login?redir=${window.location.pathname}`}>
                <Image src="res/user-plus.svg" alt="User Icon" width={20} height={20} style={{ verticalAlign: "-0.2em", display: "inline", width: "auto", height: "1.2em" }} />
                &nbsp;
                <b>Login Here!</b>
            </Link>
        );
    };

    useEffect(() => {
        if (!props.hideProfileMarkup) {
            const effect = async () => {
                const profile: UserProfile = new UserProfile();
                if (!profile.empty()) {
                    try {
                        if (!profile.resolved()) {
                            await profile.fetchAssignUserData();
                            profile.sync();
                        }
                        setProfileMarkup(<ProfileDropdown profile={profile} />);
                    } catch {
                        setLoggedOutProfileMarkup();
                    }
                } else setLoggedOutProfileMarkup();
            };
            effect();
        }
    }, [props.hideProfileMarkup]);

    return (
        <nav className="accent-color-2" style={{ width: "100%" }}>
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
