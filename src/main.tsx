import {createTheme, ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import {createRoot} from "react-dom/client";
import App from "./App";
import "./styles.css";

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
})

createRoot(document.getElementById("root") as HTMLElement).render(
    <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <App/>
    </ThemeProvider>,
);
