import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {GetSingleEntryRes} from "types";
import './TermsTable.css';
import {LoginContext} from "../../contexts/login.context";
import {TermbaseContext} from "../../contexts/termbase.context";


export const SingleTerm = () => {
    const [entry, setEntry] = useState<GetSingleEntryRes | null>(null);
    const {termId} = useParams();

    const {userName} = useContext(LoginContext);
    const {termbaseName} = useContext(TermbaseContext);

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/user/${userName}/termbases/${termbaseName}/${termId}`);
            setEntry(await res.json());
        })();
    }, []);

    if (entry === null) {
        return null;
    }

    return <>
        <div className="container mt-5">
            <h2 className="my-5 theme-text-mainbrand">{entry.entry.term}</h2>
            <div className="my-3">
                <Link to={`/user/${userName}/termbases/${termbaseName}/${entry.entry.id}/edit`}
                      className="btn theme-btn-light-main mb-5 me-3"
                >
                    Edytuj
                </Link>
                <button
                    className="btn theme-btn-darkaccent border-3 mb-5 me-3"

                    // onClick={deleteConfirm}
                >
                    Usuń
                </button>
                <Link to={`/user/${userName}/termbases/${termbaseName}`}
                      className="btn theme-btn-light-darkaccent mb-5 me-3"
                >
                    Wróć do listy haseł
                </Link>
            </div>

            <table className="table table-striped TermsTable align-middle">
                <tbody>
                <tr>
                    <th>Źródło</th>
                    <td>{entry.entry.termSource}</td>
                </tr>
                <tr>
                    <th>Definicja</th>
                    <td>{entry.entry.termDefinition}</td>
                </tr>
                <tr>
                    <th>Źródło definicji</th>
                    <td>{entry.entry.termDefinitionSource}</td>
                </tr>
                <tr>
                    <th>Kolokacje</th>
                    <td>{entry.entry.termCollocations}</td>
                </tr>
                <tr>
                    <th>Ekwiwalent</th>
                    <td className="fw-bold">{entry.entry.equivalent}</td>
                </tr>
                <tr>
                    <th>Źródło</th>
                    <td>{entry.entry.equivalentSource}</td>
                </tr>
                <tr>
                    <th>Definicja</th>
                    <td>{entry.entry.equivalentDefinition}</td>
                </tr>
                <tr>
                    <th>Źródło definicji</th>
                    <td>{entry.entry.termDefinitionSource}</td>
                </tr>
                <tr>
                    <th>Kolokacje</th>
                    <td>{entry.entry.equivalentCollocations}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </>
}