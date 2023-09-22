import {Settings} from "./Settings.tsx";
import {Divider, Stack, Typography} from "@mui/material";
import {useAppSettingsStore} from "../store/app-settings.ts";

function StatusBar(props: {
    statusMessage: string;
    statusCode: string;
}) {
    const statusMessage = props.statusMessage ?? '';
    const statusCode = props.statusCode ?? '';
    const theme = useAppSettingsStore(state => state.appSettings.theme)
    return (
        <section className={"status-bar-container"}>
            <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
            >
                 <Typography>
                    {theme}
                </Typography>
                <Divider orientation="vertical" flexItem/>
                <Typography>
                    {statusMessage} {statusMessage && "-"} {statusCode}
                </Typography>
                <Divider orientation="vertical" flexItem/>
                <Settings/>
            </Stack>
        </section>
    );
}

export default StatusBar;
