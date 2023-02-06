import React from "react";
import {AddUser} from "../components/user/AddUser";
import {Menu} from "../components/homepage/Menu";

export const RegisterView = () => {
    return <>
        <Menu/>
        <AddUser/>
    </>
}