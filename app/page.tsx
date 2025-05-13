import type { Metadata } from "next";
import { headMetadata } from "./metadata";
import Nav from "../components/nav";

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
        </>
    );
}
