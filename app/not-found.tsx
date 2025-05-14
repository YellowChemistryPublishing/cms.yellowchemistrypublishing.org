import { Metadata } from "next";
import HTTPErrorPage from "../public/shared-common/http_error";
import { headMetadata } from "../components/metadata";
import fs from "node:fs";

export const metadata: Metadata = headMetadata({
    title: "404 Not Found",
    favicon: `data:image/png;base64, ${fs.readFileSync("public/shared-common/res/favicon.png", "base64")}`,
    themeColor: "#ed771d",
    keywords: "HTTP, Error, Yellow Chemistry Publishing",
    description: "The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.",
    replyTo: "engineering@yellowchemistrypublishing.org",
    copyright: `${new Date().getFullYear()} Yellow Chemistry Publishing`
});

export default function NotFound() {
    return (
        <HTTPErrorPage
            prefix="public/shared-common"

            status={404}
            message="Not Found"
            isOk={false}
            description="The origin server did not find a current representation for the target resource or is not willing to disclose that one exists."
            moz_dev_docid="404_not_found"
        />
    );
}
