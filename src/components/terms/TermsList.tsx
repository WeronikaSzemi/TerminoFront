import React, {useEffect, useState} from "react";
import {TermEntity} from 'types';
import {TermsTable} from "./TermsTable";
import {Spinner} from "../Spinner/Spinner";

export const TermsList = () => {
    const [termList, setTermList] = useState<TermEntity[] | null>(null);

    const refreshList = async () => {
        setTermList(null);
        const res = await fetch('http://localhost:3001/terms');
        const data = await res.json();
        setTermList(data.termsList);
    };

    useEffect(() => {
        refreshList();
    }, []);

    if (termList === null) {
        return <Spinner/>
    }

    return <>
        <div className="container mt-5">
            <h2 className="mb-4">Terminy</h2>
            <TermsTable terms={termList}
                        onListChange={refreshList}/>
        </div>

    </>;
}