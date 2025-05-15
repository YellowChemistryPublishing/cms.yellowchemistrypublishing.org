import { headMetadata } from "../../components/metadata";
import { JSX } from "react";
import { Metadata } from "next";
import Nav from "../../components/nav";
import { SignInPageContent } from "./content";

export const metadata: Metadata = headMetadata({
    title: "cms: Login",
    favicon: "/shared-common/res/favicon.png",
    themeColor: "#ed771d",
    description: "Login to cms here!",
    replyTo: "engineering@yellowchemistrypublishing.org",
    copyright: `${new Date().getFullYear().toString()} Yellow Chemistry Publishing`
});

export default function Page(): JSX.Element {
    return (
        <>
            <Nav hideProfileMarkup={true} />
            <main className="main-box reading-box accent-color-2" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <SignInPageContent />
            </main>
        </>
    );
}
