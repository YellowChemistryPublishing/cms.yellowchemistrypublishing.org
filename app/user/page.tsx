import { headMetadata } from "../../components/metadata";
import { JSX } from "react";
import { Metadata } from "next";
import Nav from "../../components/nav";
import UserPageContent from "./content";

export const metadata: Metadata = headMetadata({
    title: "User Profile | cms",
    favicon: "/shared-common/res/favicon.png",
    themeColor: "#ed771d",
    description: "Your details are here!",
    replyTo: "engineering@yellowchemistrypublishing.org",
    copyright: `${new Date().getFullYear().toString()} Yellow Chemistry Publishing`
});

export default function Page(): JSX.Element {
    return (
        <>
            <Nav />
            <main className="main-box reading-box accent-color-2" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <UserPageContent />
            </main>
        </>
    );
}
