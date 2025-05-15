"use client";

import { JSX, useEffect, useState } from "react";
import FilingCabinetFolder from "../components/filing_cabinet";
import { ReactState } from "../components/state";

export default function FilingCabinetRadioFolder(): JSX.Element {
    const [markup, setMarkup]: ReactState<JSX.Element> = useState(<></>);
    const [clickCount, setClickCount]: ReactState<number> = useState(0);

    useEffect((): (() => void) => {
        const onMouseClick = (ev: MouseEvent): void => {
            const target: HTMLElement = ev.target as HTMLElement;
            const dropdownContainer: HTMLElement | null = document.getElementById("profile-dropdown-container");
            if (dropdownContainer?.contains(target)) setClickCount(clickCount + 1);
            if (clickCount === 4)
                setMarkup(
                    <FilingCabinetFolder href="/radio">
                        <h2>Yellow Chemistry Radio</h2>
                        <p>Oooooh secret applet!</p>
                    </FilingCabinetFolder>
                );
        };

        addEventListener("click", onMouseClick);
        return () => {
            removeEventListener("click", onMouseClick);
        };
    }, [clickCount]);

    return markup;
}
