import CodeMirror from '@uiw/react-codemirror';
import { dracula } from "@uiw/codemirror-theme-dracula";
import {langs} from "@uiw/codemirror-extensions-langs";
import {useCallback, useState} from "react";
import {evalInputCode} from "../Utils";

function EditorView(props: {
    initialInput: string,
    appLocalDataDir: string,
    initialOutput?: string,
}) {
    const [codeInput, setCodeInput] = useState(props.initialInput)
    const [codeOutput, setCodeOutput] = useState(props.initialOutput ?? '')
    const handleOnChange = useCallback((value: string) => {
        setCodeInput(value)
        evalInputCode(value, props.appLocalDataDir).then((result: any) => {
            setCodeOutput(result)
        })
    }, [])
    return (
        <section
            className='container'
        >
            <CodeMirror
              value={codeInput}
              theme={dracula}
              onChange={handleOnChange}
              extensions={[langs.tsx()]}
            />
            <CodeMirror
              value={codeOutput}
              editable={false}
              readOnly={true}
              theme={dracula}
              extensions={[langs.tsx()]}
            />
        </section>
    )
}

export default EditorView;
