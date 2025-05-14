"use client";

import { useEffect, useState } from "react";
import FilingCabinetFolder from "../components/filing_cabinet";

export default function FilingCabinetRadioFolder() {
    const [markup, setMarkup] = useState(<></>);
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        const onMouseClick = (ev: MouseEvent) => {
            const target = ev.target as HTMLElement;
            const dropdownContainer = document.getElementById("profile-dropdown-container");
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
