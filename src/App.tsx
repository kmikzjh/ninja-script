import {ChangeEvent, useState} from "react";
import {evalInputCode, getAppLocalDataDirPath, getOldFile} from "./Utils";
import CodeEditor from '@uiw/react-textarea-code-editor';
import "./App.css";
import StatusBar from "./components/StatusBar.tsx";

let appLocalDataDir = '';
let lastFile = '';

getAppLocalDataDirPath().then((res: string) => {
    appLocalDataDir = res;
})

getOldFile().then((res) => {
    lastFile = res || '';
})

function App() {
    const [codeInput, setCodeInput] = useState(lastFile);
    const [codeOutput, setCodeOutput] = useState('');
    const [statusCode, setStatusCode] = useState('')
    const [statusMessage, setStatusMessage] = useState('')

    const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setStatusCode('Info')
        setStatusMessage('Processing...')
        setCodeInput(event.target.value)
        evalInputCode(event.target.value, appLocalDataDir).then((result: any) => {
            setCodeOutput(result)
            console.log("-> codeInput", codeInput);
            console.log("-> codeOutput", codeOutput);
            setStatusCode('Ok')
            setStatusMessage('')
        })
    }

    // if (lastFile.length > 0) {
    //     handleOnChange(lastFile)
    // }

    return (
        <>
            <StatusBar statusCode={statusCode} statusMessage={statusMessage}/>
            <section
                className='container'
            >
                <CodeEditor
                    language="js"
                    placeholder="Enter JS/TS code."
                    padding={15}
                    value={codeInput}
                    onChange={(event) => handleOnChange(event)}
                    style={{
                        fontSize: 14,
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
                <CodeEditor
                    language="js"
                    placeholder="JS/TS output."
                    padding={15}
                    value={codeOutput}
                    readOnly={true}
                    style={{
                        fontSize: 14,
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />

            </section>
        </>
    );
}

export default App;
