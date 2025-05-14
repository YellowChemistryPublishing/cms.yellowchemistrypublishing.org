import type { Metadata } from "next";
import { headMetadata } from "../components/metadata";
import Nav from "../components/nav";
import FilingCabinetFolder from "../components/filing_cabinet";
import FilingCabinetRadioFolder from "./section_radio_folder";
import FilingCabinetAdminFolder from "./section_admin_folder";
import Image from "next/image";

export const metadata: Metadata = headMetadata({
    title: "cms @ Yellow Chemistry Publishing",
    favicon: "/shared-common/res/favicon.png",
    themeColor: "#ed771d",
    description: "Welcome to the content management system at Yellow Chemistry Publishing.",
    replyTo: "engineering@yellowchemistrypublishing.org",
    copyright: `${new Date().getFullYear()} Yellow Chemistry Publishing`
});

export default function Page() {
    return (
        <>
            <Nav />
            <main className="accent-color-2" style={{ display: "flex", flexDirection: "column", width: "100%", flex: "1 1 0", height: "100%" }}>
                <FilingCabinetFolder href="/infodesk">
                    <h2>Policy, Procedures, and Information</h2>
                    <p>Access all your documentation and information here.</p>
                </FilingCabinetFolder>
                <FilingCabinetFolder href="/invenman">
                    <h2>invenman</h2>
                    <p>Manage your inventories.</p>
                </FilingCabinetFolder>
                <FilingCabinetFolder href="/discourse">
                    <h2>DiskHorse</h2>
                    <p>Visit your forums.</p>
                    <div className="content-box" style={{ flex: "1 1 0" }}>
                        <Image
                            className="zero-box zero-margin brm"
                            src="/res/diskhorse.jpg"
                            alt="honse"
                            width={160}
                            height={160}
                            style={{ minWidth: 0, width: "100%", height: "auto", maxWidth: "100%", maxHeight: "100%" }}
                        />
                    </div>
                </FilingCabinetFolder>
                <FilingCabinetRadioFolder />
                <FilingCabinetAdminFolder />
            </main>
        </>
    );
}
