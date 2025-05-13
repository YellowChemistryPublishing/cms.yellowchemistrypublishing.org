import Nav from "../../components/nav";
import { Metadata } from "next";
import { headMetadata } from "../metadata";
import { SignInPageContent } from "../../components/login/common";
import { Suspense } from "react";

export const metadata: Metadata = headMetadata({
    title: "Login to cms @ Yellow Chemistry Publishing",
    favicon: "/shared-common/res/favicon.png",
    themeColor: "#ed771d",
    description: "Login to the cms here!",
    replyTo: "engineering@yellowchemistrypublishing.org",
    copyright: `${new Date().getFullYear()} Yellow Chemistry Publishing`
});

export default function Page() {
    return (
        <>
            <Nav hideProfileMarkup={true} />
            <main className="main-box reading-box accent-color-2" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Suspense fallback={<></>}>
                    <SignInPageContent />
                </Suspense>
            </main>
        </>
    );
}
