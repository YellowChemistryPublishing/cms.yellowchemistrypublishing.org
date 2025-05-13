import "../public/shared-common/css/default.css";
import "../public/shared-common/css/themes/yel-chem-research-light.css";

import StyledJsxRegistry from "./registry";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en-AU">
            <head>
                {/* The below + /metadata.tsx should provide equivalent metadata to the nunjucks include at /public/shared-common/include/head_metadata.html */}

                <meta httpEquiv="Content-Language" content="en-AU" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

                <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
            </head>
            <body>
                <StyledJsxRegistry>{children}</StyledJsxRegistry>
            </body>
        </html>
    );
}
