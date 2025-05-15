"use client";

import { createStyleRegistry, StyledJsxStyleRegistry, StyleRegistry } from "styled-jsx";
import React, { JSX, useState } from "react";
import { ReactState } from "../components/state";
import { useServerInsertedHTML } from "next/navigation";

export default function StyledJsxRegistry({ children }: { children: React.ReactNode }): JSX.Element {
    const [jsxStyleRegistry]: ReactState<StyledJsxStyleRegistry> = useState(() => createStyleRegistry());

    useServerInsertedHTML(() => {
        const styles: JSX.Element[] = jsxStyleRegistry.styles();
        jsxStyleRegistry.flush();
        return <>{styles}</>;
    });

    return <StyleRegistry registry={jsxStyleRegistry}>{children}</StyleRegistry>;
}
