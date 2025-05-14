"use client";

import Image from "next/image";
import Link from "next/link";

export default function FilingCabinetFolder(props: { href: string; children: React.ReactNode }) {
    return (
        <>
            <style jsx>{`
                :global(a.filing-cabinet-folder > :nth-child(3)) {
                    margin-left: 0;

                    transition: margin-left 0.2s ease-in-out;
                }
                :global(a.filing-cabinet-folder:hover > :nth-child(3)) {
                    margin-left: calc(43px + 5px + 15px);
                }
                :global(a.filing-cabinet-folder > :nth-child(2)) {
                    position: absolute;
                    left: 0;
                    opacity: 0%;

                    transition: left 0.2s ease-in-out, opacity 0.2s ease-in-out;
                }
                :global(a.filing-cabinet-folder:hover > :nth-child(2)) {
                    left: calc(43px + 20px);
                    opacity: 100%;
                }
                :global(a.filing-cabinet-folder > :nth-child(1)) {
                    position: absolute;
                    left: calc(-43px);
                    opacity: 0%;

                    transition: left 0.2s ease-in-out, opacity 0.2s ease-in-out;
                }
                :global(a.filing-cabinet-folder:hover > :nth-child(1)) {
                    left: calc(20px);
                    opacity: 100%;
                }
            `}</style>
            <Link
                className="plh prh filing-cabinet-folder"
                href={props.href}
                style={{
                    color: "inherit",
                    textDecoration: "none",
                    fontWeight: "inherit",
                    fontSize: "inherit",

                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    flex: 1,
                    position: "relative",
                    width: "100%"
                }}
            >
                <Image className="mtm mrz mbm mlz" src="res/chevron-right.svg" alt="GitHub Logo" width={20} height={20} style={{ width: "auto", height: "43px" }} />
                <div aria-hidden={true} className="ptm mrm pbm mlz wt" style={{ height: "100%" }}>
                    <div className="accent-color-bg-2" style={{ height: "100%" }}></div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>{props.children}</div>
            </Link>
        </>
    );
}
