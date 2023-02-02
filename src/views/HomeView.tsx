import React from "react";
import {Header} from "../components/Header";
import {Menu} from "../components/Menu";
import {LoginOrRegister} from "../components/LoginOrRegister";
import {Welcome} from "../components/Welcome";
import {AboutTermino} from "../components/AboutTermino";
import {ContactForm} from "../components/ContactForm";

export const HomeView = () => {
    return <>
        <Header/>
        <Menu/>
        <Welcome/>
        <AboutTermino/>
        <LoginOrRegister/>
        <ContactForm/>
    </>
}