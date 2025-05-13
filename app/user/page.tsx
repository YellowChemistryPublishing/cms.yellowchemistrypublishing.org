import { Metadata } from "next";
import Nav from "../../components/nav";
import { headMetadata } from "../metadata";
import UserPageContent from "./content";

export const metadata: Metadata = headMetadata({
    title: "cms: User Profile",
    favicon: "/shared-common/res/favicon.png",
    themeColor: "#ed771d",
    description: "Your details are here!",
    replyTo: "engineering@yellowchemistrypublishing.org",
    copyright: `${new Date().getFullYear()} Yellow Chemistry Publishing`
});

export default function Page() {
    return (
        <>
            <Nav />
            <main className="main-box reading-box accent-color-2" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <UserPageContent />
            </main>
        </>
    );
}
