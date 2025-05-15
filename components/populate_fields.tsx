import { JSX } from "react";

export default function PopulateFields(props: { data: { key: JSX.Element; value: JSX.Element }[] }): JSX.Element {
    return (
        <table className="content-box bsz" style={{ tableLayout: "fixed", width: "100%" }}>
            <tbody className="zero-margin">
                {props.data.map((item: { key: JSX.Element; value: JSX.Element }, i: number) => (
                    <tr key={i}>
                        <td className="pbt prm">{item.key}</td>
                        <td className="pbt">{item.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
