import React from "react";
import {Header} from "../components/homepage/Header";
import {Menu} from "../components/homepage/Menu";
import {LoginOrRegister} from "../components/homepage/LoginOrRegister";
import {Welcome} from "../components/homepage/Welcome";
import {AboutTermino} from "../components/homepage/AboutTermino";
import {ContactForm} from "../components/homepage/ContactForm";

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