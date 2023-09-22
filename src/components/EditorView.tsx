import CodeMirror from '@uiw/react-codemirror';
import {THEMES} from "../constants/themes.ts";
import {langs} from "@uiw/codemirror-extensions-langs";
import {useCallback, useState} from "react";
import fileApiService from "../services/file-api.service.ts";
import {useAppStatusStore} from "../store/app-status.ts";
import {useAppSettingsStore} from "../store/app-settings.ts";

function EditorView(props: {
    initialInput: string,
    appLocalDataDir: string,
    initialOutput?: string,
}) {
    const [codeInput, setCodeInput] = useState(props.initialInput)
    const [codeOutput, setCodeOutput] = useState(props.initialOutput ?? '')
    const setStatus = useAppStatusStore(state => state.setStatus)
    const theme = useAppSettingsStore(state => state.appSettings.theme)
    const setSettings = useAppSettingsStore(state => state.setSettings)
    // @ts-ignore
    const selectedTheme = THEMES.hasOwnProperty(theme) ? THEMES[theme] : THEMES.aura
    if (theme === "") {
        setSettings({theme: 'aura'})
    }
    const handleOnChange = useCallback((value: string) => {
        setStatus({
            code: 'Info',
            message: 'Processing...'
        })
        setCodeInput(value)
        fileApiService.evalInputCode(value, props.appLocalDataDir).then((result: any) => {
            setCodeOutput(result)
            setStatus({
                code: 'Ok',
                message: ''
            })
        })
    }, [])
    return (
        <section
            className='container'
        >
            <CodeMirror
                value={codeInput}
                theme={selectedTheme}
                onChange={handleOnChange}
                extensions={[langs.tsx()]}
                basicSetup={{
                    crosshairCursor: false
                }}
            />
            <CodeMirror
                value={codeOutput}
                editable={false}
                readOnly={true}
                theme={selectedTheme}
                extensions={[langs.tsx()]}
                basicSetup={{
                    crosshairCursor: false
                }}
            />
        </section>
    )
}

export default EditorView;
