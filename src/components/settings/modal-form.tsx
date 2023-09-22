import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from "@mui/material";
import {useAppSettingsStore} from '../../store/app-settings.ts'
import {THEMES} from "../../constants/themes.ts";

export default function ModalForm(props: {
    open: boolean
    handleClose: () => void
}) {
    const setSettings = useAppSettingsStore(state => state.setSettings)
    const theme = useAppSettingsStore(state => state.appSettings.theme)
    const themes = Object.keys(THEMES);

    const handleChange = (event: SelectChangeEvent<typeof theme>) => {
        const {
            target: {value},
        } = event;
        setSettings({theme: value});
    };

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                fullWidth={true}
                maxWidth={'sm'}
            >
                <DialogTitle>Settings</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Change theme
                    </DialogContentText>
                    <FormControl variant="standard" sx={{m: 1, minWidth: 160}}>
                        <InputLabel id="selected-theme-label">Theme</InputLabel>
                        <Select
                            value={theme}
                            labelId="selected-theme-label"
                            onChange={handleChange}
                        >
                            {themes.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
