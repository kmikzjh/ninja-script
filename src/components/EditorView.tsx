import CodeMirror from '@uiw/react-codemirror';
// import { dracula } from "@uiw/codemirror-theme-dracula";
import {aura} from "@uiw/codemirror-theme-aura";
import {langs} from "@uiw/codemirror-extensions-langs";
import {useCallback, useState} from "react";
import fileApiService from "../services/file-api.service.ts";
import {useAppStatusStore} from "../store/app-status.ts";

function EditorView(props: {
    initialInput: string,
    appLocalDataDir: string,
    initialOutput?: string,
}) {
    const [codeInput, setCodeInput] = useState(props.initialInput)
    const [codeOutput, setCodeOutput] = useState(props.initialOutput ?? '')
    const setStatus = useAppStatusStore(state => state.setStatus)
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
                theme={aura}
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
                theme={aura}
                extensions={[langs.tsx()]}
                basicSetup={{
                    crosshairCursor: false
                }}
            />
        </section>
    )
}

export default EditorView;
