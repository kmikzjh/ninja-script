import {useEffect, useState} from "react";
import {evalInputCode, getAppLocalDataDirPath, getOldFile} from "./Utils";
import "./App.css";
import StatusBar from "./components/StatusBar.tsx";
import EditorView from "./components/EditorView.tsx";

let appLocalDataDir = '';
let lastInput: string = '';
let lastOutput: string = '';

function App() {
    const [loading, setLoading] = useState(false);
    const [statusCode, setStatusCode] = useState('Ok')
    const [statusMessage, setStatusMessage] = useState('')

    const initApp = async () => {
        setStatusCode('Info')
        setStatusMessage('Initialize app')
        appLocalDataDir = await getAppLocalDataDirPath();
        lastInput = await getOldFile();
        if (lastInput != '') {
            lastOutput = await evalInputCode(lastInput, appLocalDataDir);
        }
        setStatusCode('Ok')
        setStatusMessage('')
    }
    useEffect(() => {
        setLoading(true)
        initApp().then(() => {
            setLoading(false)
            console.log('🚀 last configuration loaded');
        })
    },[])

    return (
        <>
            <StatusBar statusCode={statusCode} statusMessage={statusMessage}/>
            {!loading &&
            <EditorView
                initialInput={lastInput}
                appLocalDataDir={appLocalDataDir}
                initialOutput={lastOutput}
            />
            }
        </>
    );
}

export default App;
