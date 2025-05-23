import "../public/shared-common/css/default.css";
import "../public/shared-common/css/themes/yel-chem-research-light.css";

import { JSX } from "react";

import StyledJsxRegistry from "./registry";

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <html lang="en-AU">
            <head>
                {/* The below + /metadata.tsx should provide equivalent metadata to the nunjucks include at /public/shared-common/include/head_metadata.html */}

                <meta httpEquiv="Content-Language" content="en-AU" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

                <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
            </head>
            <body style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%", height: "100%" }}>
                <StyledJsxRegistry>{children}</StyledJsxRegistry>
            </body>
        </html>
    );
}
