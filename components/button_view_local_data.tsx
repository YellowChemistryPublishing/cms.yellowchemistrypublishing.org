import { JSX, useEffect, useState } from "react";
import Image from "next/image";
import { ReactState } from "./state";
import { UserProfile } from "./user_profile";

export default function ButtonViewLocalData(props: { profile: UserProfile }): JSX.Element {
    const defaultMarkup = (): JSX.Element => (
        <button id="display-userdata" className="brt">
            <Image
                className="inline-logo accent-color-tint-1"
                src="res/chevron-right.svg"
                alt="GitHub Logo"
                width={20}
                height={20}
            />
            &nbsp; Click to View
        </button>
    );
    const [markup, setMarkup]: ReactState<JSX.Element> = useState(defaultMarkup());

    useEffect(() => {
        const onMouseClick = (ev: MouseEvent): void => {
            const button: HTMLElement = ev.target as HTMLElement;
            if (button.id == "display-userdata")
                setMarkup(
                    <>
                        <pre className="content-box zero-margin">{JSON.stringify(props.profile, null, 4)}</pre>
                        <button id="hide-userdata" className="brt">
                            <Image
                                className="inline-logo accent-color-tint-1"
                                src="res/chevron-up.svg"
                                alt="GitHub Logo"
                                width={20}
                                height={20}
                            />
                            &nbsp; Click to Hide
                        </button>
                    </>
                );
            else if (button.id == "hide-userdata") setMarkup(defaultMarkup());
        };

        addEventListener("click", onMouseClick);
        return (): void => {
            removeEventListener("click", onMouseClick);
        };
    }, [props.profile]);

    return markup;
}
