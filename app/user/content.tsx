"use client";

import { useEffect, useState } from "react";
import { UserProfile } from "../../components/user_profile";
import { ShouldRedirect } from "../../components/should_redirect";
import LocalUserDataSection from "./section_local_user_data";
import PopulateFields from "../../components/populate_fields";

export default function UserPageContent() {
    const [profile, setProfile] = useState({} as UserProfile);

    useEffect(() => {
        const profile = new UserProfile();
        if (!profile.resolved()) new ShouldRedirect("/login?redir=" + window.location.pathname).redirectRegardless();

        setProfile(profile);
    }, []);

    return (
        <>
            <h2>Account</h2>
            <PopulateFields
                data={[
                    { key: <>Display Name</>, value: <b>{profile.displayName}</b> },
                    { key: <>Authentication Backend</>, value: <b>{profile.type === "gh" ? "GitHub" : ""}</b> },
                    { key: <>Email</>, value: <b></b> },
                    { key: <>Linked Accounts</>, value: <b></b> },
                    { key: <>Groups</>, value: <b></b> }
                ]}
            />
            <LocalUserDataSection profile={profile} />
        </>
    );
}
