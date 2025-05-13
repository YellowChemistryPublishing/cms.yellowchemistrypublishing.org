"use client";

import { useEffect, useState } from "react";
import { UserProfile } from "../user_profile";

export default function UserPageContent() {
    const [markup, setMarkup] = useState(<></>);

    useEffect(() => {
        const profile = new UserProfile();
        if (!profile.resolved()) window.location.href = window.location.protocol + "//" + window.location.host + "/login?redir=" + window.location.pathname;
        else
            setMarkup(
                <>
                    <h2>Your Local User Data</h2>
                    <code className="content-box" style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", width: "100%" }}>
                        {JSON.stringify(profile)}
                    </code>
                </>
            );
    }, []);

    return markup;
}
