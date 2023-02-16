import {createContext, Dispatch, SetStateAction} from "react";

interface LoginContextType {
    loggedIn: boolean;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const LoginContext = createContext<LoginContextType>({
    loggedIn: false,
    setLoggedIn: () => {
    },
});