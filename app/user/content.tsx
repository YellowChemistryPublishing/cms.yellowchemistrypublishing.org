"use client";

import { JSX, useEffect, useState } from "react";
import ButtonDeleteRemoteData from "../../components/button_delete_remote_data";
import ButtonViewLocalData from "../../components/button_view_local_data";
import PopulateFields from "../../components/populate_fields";
import { ReactState } from "../../components/state";
import { ShouldRedirect } from "../../components/should_redirect";
import { UserProfile } from "../../components/user_profile";

export default function UserPageContent(): JSX.Element {
    const [markup, setMarkup]: ReactState<JSX.Element> = useState<JSX.Element>(<></>);

    useEffect(() => {
        const profile: UserProfile = new UserProfile(true);
        if (!profile.resolved()) new ShouldRedirect("/login?redir=" + window.location.pathname).redirectRegardless();

        setMarkup(
            <>
                <h2>Account</h2>
                <PopulateFields
                    data={[
                        { key: <>Display Name</>, value: <b>{(profile.data as { displayName: string } | null)?.displayName}</b> },
                        { key: <>Authentication Backend</>, value: <b>{profile.vendor === "gh" ? "GitHub" : ""}</b> },
                        { key: <>Email</>, value: <b></b> },
                        { key: <>Linked Accounts</>, value: <b></b> },
                        { key: <>Groups</>, value: <b></b> },
                        { key: <>Tags</>, value: <b></b> }
                    ]}
                />
                <h3>Your Local Data</h3>
                <p>
                    The following data is currently stored locally on your device. This data is not shared with any third parties, and is only used to provide a better experience.
                    Your <em>remote</em> data comprises only of your administrative user data, which would <em>exclude</em>, for example, your GitHub profile. It is deleted as soon
                    as you log out.
                </p>
                <ButtonViewLocalData profile={profile} />
                <h3>Delete My Data (Remote)</h3>
                <p>
                    You may request, at any time, that your identity be removed from our systems. This will remove all of the data associated with you from our systems, i.e. your
                    inventory access, your administrator status, etc., which will also remove your existing access to authorisation-required applets. If you understand the
                    consequences of this action, please click the button below to proceed.
                </p>
                <ButtonDeleteRemoteData />
            </>
        );
    }, []);

    return markup;
}
