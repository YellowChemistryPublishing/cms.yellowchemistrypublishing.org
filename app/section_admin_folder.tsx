"use client";

import { JSX, useEffect, useState } from "react";
import FilingCabinetFolder from "../components/filing_cabinet";
import { ReactState } from "../components/state";

import { UserProfile } from "../components/user_profile";
export default function FilingCabinetAdminFolder(): JSX.Element {
    const [markup, setMarkup]: ReactState<JSX.Element> = useState(<></>);

    useEffect(() => {
        const profile: UserProfile = new UserProfile(true);
        if (profile.data && (profile.data as { isAdmin: boolean }).isAdmin)
            setMarkup(
                <FilingCabinetFolder href="/admin">
                    <h2>adminctl</h2>
                    <p>You&apos;re an administrator. Don&apos;t blow up my webserver.</p>
                </FilingCabinetFolder>
            );
    }, []);

    return markup;
}
