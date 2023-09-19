import {useEffect, useState} from "react";
import FileApiService from "./services/file-api.service.ts";
import "./App.css";
import StatusBar from "./components/StatusBar.tsx";
import EditorView from "./components/EditorView.tsx";
import { useAppStatusStore} from "./store/app-status.ts";

let appLocalDataDir = '';
let lastInput: string = '';
let lastOutput: string = '';

function App() {
    const appStatus = useAppStatusStore(state => state.appStatus)
    const setStatus = useAppStatusStore(state => state.setStatus)
    const [loading, setLoading] = useState(false);

    const initApp = async () => {
        setStatus({
            code: 'Info',
            message: 'Initializing app'
        })
        appLocalDataDir = await FileApiService.getAppLocalDataDirPath();
        lastInput = await FileApiService.getOldFile();
        if (lastInput != '') {
            lastOutput = await FileApiService.evalInputCode(lastInput, appLocalDataDir);
        }
       setStatus({
            code: 'Ok',
            message: ''
        })
    }
    useEffect(() => {
        setLoading(true)
        initApp().then(() => {
            setLoading(false)
            console.log('🚀 last configuration loaded');
        })
    },[])

    return (
        <main>
            <StatusBar statusCode={appStatus.code} statusMessage={appStatus.message}/>
            {!loading &&
            <EditorView
                initialInput={lastInput}
                appLocalDataDir={appLocalDataDir}
                initialOutput={lastOutput}
            />
            }
        </main>
    );
}

export default App;
