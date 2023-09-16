import {ChangeEvent, useMemo, useState} from "react";
import {evalInputCode, getAppLocalDataDirPath, getOldFile} from "./Utils";
import CodeEditor from '@uiw/react-textarea-code-editor';
import "./App.css";
import StatusBar from "./components/StatusBar.tsx";
import BunPathContext, {ContextValue} from "./data/bun-binary-context.tsx";
import {bunBinparyPathDefault} from "./constants";

let appLocalDataDir = '';
let lastFile = '';

getAppLocalDataDirPath().then((res: string) => {
    appLocalDataDir = res;
})

getOldFile().then((res) => {
    lastFile = res || '';
})

function App() {
    const [dataContext, setDataContext] = useState<ContextValue["dataContext"]>(bunBinparyPathDefault);
    const contextValue = useMemo(() => ({dataContext, setDataContext}), [dataContext, setDataContext]);
    const [codeInput, setCodeInput] = useState(lastFile);
    const [codeOutput, setCodeOutput] = useState('');
    const [statusCode, setStatusCode] = useState('')
    const [statusMessage, setStatusMessage] = useState('')

    const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (dataContext.binaryPath.length == 0) {
            console.log('ERROR')
            setStatusCode('Error')
            setStatusMessage('Ingrese la ruta de bun')
            event.preventDefault();
        } else {
            setStatusCode('Info')
            setStatusMessage('Processing...')
            setCodeInput(event.target.value)
            evalInputCode(event.target.value, appLocalDataDir, dataContext.binaryPath).then((result: any) => {
                setCodeOutput(result)
                console.log("-> codeInput", codeInput);
                console.log("-> codeOutput", codeOutput);
                setStatusCode('Ok')
                setStatusMessage('')
            })
        }
    }

    // if (lastFile.length > 0) {
    //     handleOnChange(lastFile)
    // }

    return (
        <>
            <BunPathContext.Provider value={contextValue}>
                <StatusBar statusCode={statusCode} statusMessage={statusMessage}/>
            </BunPathContext.Provider>
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
                    placeholder="Enter JS/TS code."
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
