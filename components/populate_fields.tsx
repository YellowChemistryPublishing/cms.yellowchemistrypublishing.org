export default function PopulateFields(props: { data: { key: React.JSX.Element; value: React.JSX.Element }[] }) {
    return (
        <table className="content-box bsz" style={{ tableLayout: "fixed", width: "100%" }}>
            <tbody className="zero-margin">
                {props.data.map((item: { key: React.JSX.Element; value: React.JSX.Element }, i) => (
                    <tr key={i}>
                        <td className="pbt prm">{item.key}</td>
                        <td className="pbt">{item.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
