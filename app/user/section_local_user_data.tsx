import { JSX, useEffect, useState } from "react";
import Image from "next/image";
import { ReactState } from "../../components/state";
import { UserProfile } from "../../components/user_profile";

export default function LocalUserDataSection(props: { profile: UserProfile }): JSX.Element {
    const defaultDataMarkup = (): JSX.Element => (
        <button id="display-userdata" className="brt">
            <Image
                className="accent-color-tint-1"
                src="res/chevron-right.svg"
                alt="GitHub Logo"
                width={20}
                height={20}
                style={{ verticalAlign: "-0.2em", display: "inline", width: "auto", height: "1.2em" }}
            />
            &nbsp; Click to View
        </button>
    );
    const [dataMarkup, setDataMarkup]: ReactState<JSX.Element> = useState(defaultDataMarkup());

    useEffect(() => {
        const onMouseClick = (ev: MouseEvent): void => {
            const button: HTMLElement = ev.target as HTMLElement;
            if (button.id == "display-userdata")
                setDataMarkup(
                    <>
                        <pre className="content-box zero-margin">{JSON.stringify(props.profile, null, 4)}</pre>
                        <button id="hide-userdata" className="brt">
                            <Image
                                className="accent-color-tint-1"
                                src="res/chevron-up.svg"
                                alt="GitHub Logo"
                                width={20}
                                height={20}
                                style={{ verticalAlign: "-0.2em", display: "inline", width: "auto", height: "1.2em" }}
                            />
                            &nbsp; Click to Hide
                        </button>
                    </>
                );
            else if (button.id == "hide-userdata") setDataMarkup(defaultDataMarkup());
        };

        addEventListener("click", onMouseClick);
        return (): void => {
            removeEventListener("click", onMouseClick);
        };
    }, [props.profile]);

    return (
        <>
            <h3>Locally Stored User Data</h3>
            {dataMarkup}
        </>
    );
}
