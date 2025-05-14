import Nav from "../../components/nav";
import { Metadata } from "next";
import { headMetadata } from "../../components/metadata";
import { SignInPageContent } from "./content";

export const metadata: Metadata = headMetadata({
    title: "cms: Login",
    favicon: "/shared-common/res/favicon.png",
    themeColor: "#ed771d",
    description: "Login to cms here!",
    replyTo: "engineering@yellowchemistrypublishing.org",
    copyright: `${new Date().getFullYear()} Yellow Chemistry Publishing`
});

export default function Page() {
    return (
        <>
            <Nav hideProfileMarkup={true} />
            <main className="main-box reading-box accent-color-2" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <SignInPageContent />
            </main>
        </>
    );
}
