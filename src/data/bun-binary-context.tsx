import {createContext} from "react";

export interface ContextValue {
    dataContext: {
        binaryPath: string
    };
    setDataContext: React.Dispatch<React.SetStateAction<ContextValue["dataContext"]>>;
}

const BunPathContext = createContext<ContextValue>({
    dataContext: {
        binaryPath: '',
    },
    setDataContext: () => {
    },
});

export default BunPathContext;
