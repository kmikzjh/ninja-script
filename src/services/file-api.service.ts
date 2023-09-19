import {invoke} from '@tauri-apps/api'
import {appLocalDataDir} from '@tauri-apps/api/path';
import {BaseDirectory, readTextFile} from "@tauri-apps/api/fs";


class FileApiService {
    public async evalInputCode(inputCode: string, dataPath: string): Promise<string> {
        return await invoke('exec_bun', {inputCode, dataPath})
    }

    public async getAppLocalDataDirPath ()  {
        return await appLocalDataDir();
    }

    public async getOldFile () {
        try {
            return await readTextFile("temp_js_file.ts", {
                dir: BaseDirectory.App,
            });
        } catch (error) {
            console.log(error);
            return '';
        }
    };
}

export default new FileApiService()
