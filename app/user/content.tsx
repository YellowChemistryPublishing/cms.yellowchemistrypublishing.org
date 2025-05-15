"use client";

import { JSX, useEffect, useState } from "react";
import LocalUserDataSection from "./section_local_user_data";
import PopulateFields from "../../components/populate_fields";
import { ReactState } from "../../components/state";
import { ShouldRedirect } from "../../components/should_redirect";
import { UserProfile } from "../../components/user_profile";

export default function UserPageContent(): JSX.Element {
    const [profile, setProfile]: ReactState<UserProfile> = useState(new UserProfile());

    useEffect(() => {
        const profile: UserProfile = new UserProfile(true);
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
                    { key: <>Groups</>, value: <b></b> },
                    { key: <>Tags</>, value: <b></b> }
                ]}
            />
            <LocalUserDataSection profile={profile} />
        </>
    );
}
