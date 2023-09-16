import BunPathContext, {ContextValue} from "../data/bun-binary-context.tsx";
import {useContext} from "react";

function StatusBar(props: {
    statusMessage: string;
    statusCode: string;
}) {
    const statusMessage = props.statusMessage ?? '';
    const statusCode = props.statusCode ?? '';
    const { dataContext, setDataContext } = useContext<ContextValue>(BunPathContext);
    const { binaryPath } = dataContext;
    return (
        <section className={"status-bar-container"}>
            <div className={"status-bar-elements status-bar-binary-input"}>
                <input
                    placeholder={"Enter bun binary path..."}
                    value={binaryPath}
                    onChange={(event) => setDataContext({binaryPath: event.target.value})}
                    type="text"
                />
            </div>
            <div className={"status-bar-elements status-bar-status-text"}>
                {statusMessage} {statusMessage && "-"} {statusCode}
            </div>
        </section>
    );
}

export default StatusBar;
