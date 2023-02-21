import {createContext, Dispatch, SetStateAction} from "react";

interface TermbaseContextType {
    termbaseName: string;
    setTermbaseName: Dispatch<SetStateAction<string>>;
}

export const TermbaseContext = createContext<TermbaseContextType>({
    termbaseName: '',
    setTermbaseName: () => {
    },
});