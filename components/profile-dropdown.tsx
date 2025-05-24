"use client";

import { JSX, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ReactState } from "./state";
import { ShouldRedirect } from "./should_redirect";
import { UserProfile } from "./user_profile";

function logout(): void {
    new UserProfile().sync();
    new ShouldRedirect("/").redirectRegardless();
}
function toggleDropdown(): void {
    const dropdown: HTMLElement | null = document.getElementById("profile-dropdown");
    const chevron: HTMLElement | null = document.getElementById("profile-chevron");
    if (dropdown) {
        if (dropdown.style.opacity === "1") {
            dropdown.style.opacity = "0%";
            dropdown.style.pointerEvents = "none";
            if (chevron) chevron.setAttribute("src", "/res/chevron-right.svg");
        } else {
            dropdown.style.opacity = "100%";
            dropdown.style.pointerEvents = "all";
            if (chevron) chevron.setAttribute("src", "/res/chevron-down.svg");
        }
    }
}
function onMouseClick(ev: MouseEvent): void {
    const target: HTMLElement | null = ev.target as HTMLElement;
    const dropdownContainer: HTMLElement | null = document.getElementById("profile-dropdown-container");
    if (!dropdownContainer?.contains(target)) {
        const dropdown: HTMLElement | null = document.getElementById("profile-dropdown");
        const chevron: HTMLElement | null = document.getElementById("profile-chevron");
        if (dropdown) {
            dropdown.style.opacity = "0%";
            dropdown.style.pointerEvents = "none";
            if (chevron) chevron.setAttribute("src", "/res/chevron-right.svg");
        }
    }
}

export default function ProfileDropdown(props: { profile: UserProfile }): JSX.Element {
    const mediaQuery: MediaQueryList = window.matchMedia("(max-width: 500px)");

    const createDropdownButtonsMarkup = (smallScreen: boolean): JSX.Element => {
        return (
            <>
                <Link className="button zero-margin brt" href="/user" style={{ textAlign: smallScreen ? "left" : "right", width: "100%" }}>
                    <b>My Profile</b>
                </Link>
                <button className="zero-margin brt" onClick={logout} style={{ textAlign: smallScreen ? "left" : "right", width: "100%" }}>
                    Logout
                </button>
            </>
        );
    };
    const [dropdownButtonsMarkup, setDropdownButtonsMarkup]: ReactState<JSX.Element> = useState(createDropdownButtonsMarkup(mediaQuery.matches));

    useEffect((): (() => void) => {
        const onWatchChange = (ev: MediaQueryListEvent): void => {
            setDropdownButtonsMarkup(createDropdownButtonsMarkup(ev.matches));
        };

        addEventListener("click", onMouseClick);
        mediaQuery.addEventListener("change", onWatchChange);

        return () => {
            mediaQuery.removeEventListener("change", onWatchChange);
            removeEventListener("click", onMouseClick);
        };
    }, [mediaQuery]);

    return (
        <div className="pbm" style={{ display: "flex", flexDirection: "row", alignItems: "first baseline", position: "relative" }}>
            <p className="zero-box">
                <Image
                    id="profile-chevron"
                    className="inline-logo accent-color-tint-1"
                    src="/res/chevron-right.svg"
                    alt="Right-pointing chevron."
                    width={20}
                    height={20}
                />
                &nbsp;
            </p>
            <div id="profile-dropdown-container" className="brt" style={{ position: "relative" }}>
                <button className="zero-margin brt" onClick={toggleDropdown} style={{ textAlign: "left", width: "100%" }}>
                    Hi @{props.profile.vendor}:<wbr />
                    <b>{props.profile.displayName}</b>!
                </button>
                <div
                    id="profile-dropdown"
                    className="brt"
                    style={{
                        backgroundColor: "white",
                        boxShadow: "0px 0px 15px #1f293722",
                        opacity: "0%",
                        position: "absolute",
                        width: "100%",
                        transition: "opacity 0.2s ease-in-out"
                    }}
                >
                    {dropdownButtonsMarkup}
                </div>
            </div>
        </div>
    );
}
