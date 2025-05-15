import { headMetadata } from "../../components/metadata";
import { JSX } from "react";
import { Metadata } from "next";
import Nav from "../../components/nav";

export const metadata: Metadata = headMetadata({
    title: "Netizen | cms",
    favicon: "/shared-common/res/favicon.png",
    themeColor: "#ed771d",
    description: "Access your organisation's policies, procedures, and information.",
    replyTo: "engineering@yellowchemistrypublishing.org",
    copyright: `${new Date().getFullYear().toString()} Yellow Chemistry Publishing`
});

export default function Page(): JSX.Element {
    return (
        <>
            <Nav />
            <main className="main-box reading-box accent-color-2" style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
                <h2>Netizen @ Yellow Chemistry Publishing is coming soon!</h2>
                <p>Stay tuned, it&apos;s still in development...</p>
            </main>
        </>
    );
}
