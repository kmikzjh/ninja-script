import SettingsIcon from '@mui/icons-material/Settings';
import {IconButton,} from "@mui/material";
import ModalForm from "./settings/modal-form.tsx";
import {useState} from "react";

export function Settings() {
    const [openModalForm, setOpenModalForm] = useState(false)
    const handleClick = () => {
        setOpenModalForm(true)
    }
    const handleClose = () => {
        setOpenModalForm(false)
    }
    return (
        <>
            <IconButton aria-label="settings" size="small" onClick={handleClick}>
                <SettingsIcon fontSize="small"/>
            </IconButton>

            <ModalForm open={openModalForm} handleClose={handleClose}/>
        </>
    )
}
