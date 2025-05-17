"use client";

import { JSX, useEffect, useState } from "react";
import Link from "next/link";
import { ReactState } from "./state";

export default function ButtonDeleteRemoteData(): JSX.Element {
    const [deleteRequested, setDeleteRequested]: ReactState<number> = useState(0);

    useEffect((): (() => void) => {
        const timerID = setTimeout((): void => {
            if (deleteRequested === 1) setDeleteRequested(0);
        }, 2500);
        return (): void => clearTimeout(timerID);
    }, [deleteRequested]);

    if (deleteRequested === 0)
        return (
            <div
                onClick={(): void => {
                    setDeleteRequested(1);
                }}
                className="mbm brt accent-color-bgt-1"
            >
                <button className="zero-margin brt">
                    <b>Delete My User Data</b>
                </button>
            </div>
        );
    else if (deleteRequested === 1)
        return (
            <div
                onClick={(): void => {
                    setDeleteRequested(2);
                }}
                className="mbm brt accent-color-bgt-1"
            >
                <button className="zero-margin brt">
                    <b>Delete My User Data</b> | Click Me Again
                </button>
            </div>
        );
    else
        return (
            <p>
                Your request has been sent, and will be processed within the next 24 hours. If you did this in error, please urgently contact{" "}
                <Link href="mailto:engineering@yellowchemistrypublishing.org">engineering@yellowchemistrypublishing.org</Link>.
            </p>
        );
}
