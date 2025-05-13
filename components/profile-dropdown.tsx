"use client";

import Image from "next/image";
import { UserProfile } from "./login/common";
import { useEffect } from "react";

function logout() {
    const profile = new UserProfile();
    profile.clear();
    profile.sync();
    window.location.href = window.location.origin;
}
function toggleDropdown() {
    const dropdown = document.getElementById("profile-dropdown");
    const chevron = document.getElementById("profile-chevron");
    if (dropdown) {
        if (dropdown.style.opacity === "1") {
            dropdown.style.opacity = "0%";
            if (chevron) chevron.setAttribute("src", "/res/chevron-right.svg");
        } else {
            dropdown.style.opacity = "100%";
            if (chevron) chevron.setAttribute("src", "/res/chevron-down.svg");
        }
    }
}
function onMouseClick(ev: MouseEvent) {
    const target = ev.target as HTMLElement;
    const dropdownContainer = document.getElementById("profile-dropdown-container");
    if (!dropdownContainer?.contains(target)) {
        const dropdown = document.getElementById("profile-dropdown");
        const chevron = document.getElementById("profile-chevron");
        if (dropdown) {
            dropdown.style.opacity = "0%";
            if (chevron) chevron.setAttribute("src", "/res/chevron-right.svg");
        }
    }
}

export default function ProfileDropdown(props) {
    useEffect(() => {
        addEventListener("click", onMouseClick);

        return () => {
            removeEventListener("click", onMouseClick);
        };
    }, []);

    return (
        <div className="pbm" style={{ display: "flex", flexDirection: "row", alignItems: "first baseline", position: "relative" }}>
            <p className="zero-box">
                <Image
                    id="profile-chevron"
                    src="/res/chevron-right.svg"
                    alt="Right-pointing chevron."
                    width={20}
                    height={20}
                    style={{ verticalAlign: "-0.2em", display: "inline", height: "1.2em" }}
                />
                &nbsp;
            </p>
            <div id="profile-dropdown-container" className="brt" style={{ position: "relative" }}>
                <button className="zero-margin brt" onClick={toggleDropdown} style={{ textAlign: "right", width: "100%" }}>
                    Hi @gh:<b>{props.profile.displayName}</b>!
                </button>
                <style jsx>{`
                    #profile-dropdown {
                        transition: opacity 0.2s ease-in-out;
                    }
                `}</style>
                <div
                    id="profile-dropdown"
                    className="brt"
                    style={{ backgroundColor: "white", boxShadow: "0px 0px 15px #1f293722", opacity: "0%", position: "absolute", width: "100%" }}
                >
                    <button className="zero-margin brt" onClick={logout} style={{ textAlign: "right", width: "100%" }}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
