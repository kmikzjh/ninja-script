import { create } from 'zustand';
import { persist } from 'zustand/middleware'
import { type AppSettings } from "../interfaces/app-settings.interface.ts";

interface State {
    appSettings: AppSettings,
    getSettings: () => void,
    setSettings: ({theme}: AppSettings) => void
}

export const useAppSettingsStore = create<State>()(persist((set, get) => {
    return {
        appSettings: {
            theme: ''
        },
        getSettings: () => {
            const {appSettings} = get();
            return appSettings
        },
        setSettings: ({theme}: AppSettings) => {
            set({appSettings: {theme}})
        }
    }
}, {
    name: 'appSettings'
}))
