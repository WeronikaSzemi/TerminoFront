import React from "react";
import {Menu} from "../components/homepage/Menu";
import {TermbasesList} from "../components/termbases/TermbasesList";

export const TermbasesListView = () => {
    return <>
        <Menu/>
        <TermbasesList/>
    </>
}