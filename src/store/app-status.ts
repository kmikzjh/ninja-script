import { create } from 'zustand';
import { type AppStatus } from "../interfaces/app-status.interface.ts";

interface State {
    appStatus: AppStatus,
    getStatus: () => void
    setStatus: ({code, message}: AppStatus) => void
}

export const useAppStatusStore = create<State>((set, get) => {
    return {
        appStatus: {
            message: 'Loading...',
            code: ''
        },
        getStatus: () => {
            const { appStatus } = get();
            return appStatus
        },
        setStatus: ({code, message} : AppStatus) => {
            set({appStatus: {code, message}}, false)
        }
    }
})
