import React from "react";
import {TermsList} from "../components/terms/TermsList";
import {Menu} from "../components/homepage/Menu";

export const TermsView = () => {
    return <>
        <Menu/>
        <TermsList/>
    </>
}