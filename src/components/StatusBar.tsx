
function StatusBar(props: {
    statusMessage: string;
    statusCode: string;
}) {
    const statusMessage = props.statusMessage ?? '';
    const statusCode = props.statusCode ?? '';
    return (
        <section className={"status-bar-container"}>
            <div className={"status-bar-elements status-bar-status-text"}>
                {statusMessage} {statusMessage && "-"} {statusCode}
            </div>
        </section>
    );
}

export default StatusBar;
