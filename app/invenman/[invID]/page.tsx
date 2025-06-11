import { JSX } from "react";

export default async function Page({ params }: { params: Promise<{ invID: string }> }): Promise<JSX.Element> {
    return <>{(await params).invID}</>;
}
