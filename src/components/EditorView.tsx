import CodeMirror from '@uiw/react-codemirror';
// import { dracula } from "@uiw/codemirror-theme-dracula";
import {aura} from "@uiw/codemirror-theme-aura";
import {langs} from "@uiw/codemirror-extensions-langs";
import {useCallback, useState} from "react";
import fileApiService from "../services/file-api.service.ts";

function EditorView(props: {
    initialInput: string,
    appLocalDataDir: string,
    initialOutput?: string,
}) {
    const [codeInput, setCodeInput] = useState(props.initialInput)
    const [codeOutput, setCodeOutput] = useState(props.initialOutput ?? '')
    const handleOnChange = useCallback((value: string) => {
        setCodeInput(value)
        fileApiService.evalInputCode(value, props.appLocalDataDir).then((result: any) => {
            setCodeOutput(result)
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
            />
            <CodeMirror
                value={codeOutput}
                editable={false}
                readOnly={true}
                theme={aura}
                extensions={[langs.tsx()]}
            />
        </section>
    )
}

export default EditorView;
