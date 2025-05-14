import { Metadata } from "next";
import Nav from "../../components/nav";
import { headMetadata } from "../../components/metadata";

export const metadata: Metadata = headMetadata({
    title: "DiskHorse Forums | cms",
    favicon: "/shared-common/res/favicon.png",
    themeColor: "#ed771d",
    description: "Join the conversation at DiskHorse.",
    replyTo: "engineering@yellowchemistrypublishing.org",
    copyright: `${new Date().getFullYear()} Yellow Chemistry Publishing`
});

export default function Page() {
    return (
        <>
            <Nav />
            <main className="main-box reading-box accent-color-2" style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
                <h2>DiskHorse is coming soon!</h2>
                <p>Stay tuned, it's still in development...</p>
            </main>
        </>
    );
}
