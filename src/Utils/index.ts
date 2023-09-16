import {invoke} from '@tauri-apps/api'
import {appLocalDataDir} from '@tauri-apps/api/path';
import {BaseDirectory, readTextFile} from "@tauri-apps/api/fs";

export const parseResult = (resultEncode: string) => {
    resultEncode = resultEncode.replace('[', '');
    resultEncode = resultEncode.replace(']', '');
    const resultParts = resultEncode.split(',');
    const resultPartsNumber = resultParts.map(Number)
    return String.fromCharCode(...resultPartsNumber)
}
export const evalInputCode = async (inputCode: string, dataPath: string, binaryPath: string) => {
    return await invoke('exec_bun', {inputCode, dataPath, binaryPath})
}

export const getAppLocalDataDirPath = async () => await appLocalDataDir();

export const getOldFile = async () => {
    try {
        return await readTextFile("temp_js_file.ts", {
            dir: BaseDirectory.App,
        });
    } catch (error) {
        console.log(error);
        return false;
    }
};
