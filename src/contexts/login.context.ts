import {createContext, Dispatch, SetStateAction} from "react";

interface LoginContextType {
    loggedIn: boolean;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
    userName: string;
    setUserName: (name: string) => void;
}

export const LoginContext = createContext<LoginContextType>({
    loggedIn: false,
    setLoggedIn: () => {
    },
    userName: '',
    setUserName: (name: string) => {
    },
});