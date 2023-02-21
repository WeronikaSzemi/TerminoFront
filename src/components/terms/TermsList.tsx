import React, {useContext, useEffect, useState} from "react";
import {TermEntity} from 'types';
import {TermsTable} from "./TermsTable";
import {Spinner} from "../Spinner/Spinner";
import {LoginContext} from "../../contexts/login.context";
import {Link} from "react-router-dom";
import {TermbaseContext} from "../../contexts/termbase.context";

export const TermsList = () => {
    const [termList, setTermList] = useState<TermEntity[] | null>(null);
    const {userName} = useContext(LoginContext);
    const {termbaseName} = useContext(TermbaseContext);

    const refreshList = async () => {
        setTermList(null);

        const res = await fetch(`http://localhost:3001/user/${userName}/termbases/${termbaseName}`);
        const data = await res.json();
        setTermList(data.termsList);
    };

    useEffect(() => {
        (async () => {
            await refreshList();
        })();
    }, []);

    if (termList === null) {
        return <Spinner/>
    }

    return <>
        <div className="container p-3">
            <h2 className="my-5 theme-text-mainbrand">{termbaseName}</h2>
            <Link
                to={`/user/${userName}/termbases/${termbaseName}/addTerm`}
                className="btn theme-btn-light-main mb-5"
            >
                Dodaj hasło
            </Link>
            <Link
                to={`/user/${userName}/termbases`}
                className="btn theme-btn-light-darkaccent mb-5 ms-3"
                state={termbaseName}
            >
                Wróć do listy słowników
            </Link>
            <TermsTable terms={termList}
                        onListChange={refreshList}
            />
        </div>

    </>;
}