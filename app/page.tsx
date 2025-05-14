import type { Metadata } from "next";
import { headMetadata } from "./metadata";
import Nav from "../components/nav";
import FilingCabinetFolder from "../components/filing_cabinet";
import FilingCabinetRadioFolder from "./section_radio_folder";
import FilingCabinetAdminFolder from "./section_admin_folder";
import Image from "next/image";

export const metadata: Metadata = headMetadata({
    title: "cms @ Yellow Chemistry Publishing",
    favicon: "/shared-common/res/favicon.png",
    themeColor: "#ed771d",
    keywords: "API, CMS, Yellow Chemistry Publishing",
    description: "Welcome to the content management system at Yellow Chemistry Publishing.",
    replyTo: "engineering@yellowchemistrypublishing.org",
    copyright: `${new Date().getFullYear()} Yellow Chemistry Publishing`
});

export default function Page() {
    return (
        <>
            <Nav />
            <main className="accent-color-2" style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
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
                    <div className="content-box" style={{ flex: 1 }}>
                        <Image
                            className="zero-box zero-margin brm"
                            src="/res/diskhorse.jpg"
                            alt="honse"
                            width={320}
                            height={320}
                            style={{ width: "auto", maxWidth: "100%", height: "100%" }}
                        />
                    </div>
                </FilingCabinetFolder>
                <FilingCabinetRadioFolder />
                <FilingCabinetAdminFolder />
            </main>
        </>
    );
}
