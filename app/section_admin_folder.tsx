"use client";

import { useEffect, useState } from "react";
import { UserProfile } from "../components/user_profile";
import FilingCabinetFolder from "../components/filing_cabinet";

export default function FilingCabinetAdminFolder() {
    const [markup, setMarkup] = useState(<></>);

    useEffect(() => {
        const profile = new UserProfile();
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
