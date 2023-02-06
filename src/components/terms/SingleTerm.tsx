import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {GetSingleEntryRes} from "types";
import './TermsTable.css';


export const SingleTerm = () => {
    const [entry, setEntry] = useState<GetSingleEntryRes | null>(null);
    const {termId} = useParams();

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/terms/${termId}`);
            setEntry(await res.json());
        })();
    }, []);

    if (entry === null) {
        return null;
    }

    return <>
        <div className="container mt-5">
            <h2 className="mb-4">{entry.entry.term}</h2>
            <div className="my-3">
                <Link to={`/terms/${entry.entry.id}/edit`}
                      className="btn btn-sm theme-btn-lightaccent mx-1 my-1 my-md-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg"
                         width="16"
                         height="16"
                         fill="currentColor"
                         className="bi bi-pencil-fill me-1"
                         viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                    Edytuj
                </Link>
                <button
                    className="btn btn-sm theme-btn-darkaccent mx-1 my-1 my-md-0"
                    // onClick={deleteConfirm}
                >
                    <svg xmlns="http://www.w3.org/2000/svg"
                         width="16"
                         height="16"
                         fill="currentColor"
                         className="bi bi-trash3-fill"
                         viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                    </svg>
                    Usuń
                </button>
                <Link to={`/termbases/sampletermbase`}
                      className="btn btn-sm theme-btn-mainbrand mx-1 my-1 my-md-0"
                    // onClick={}
                >
                    <svg xmlns="http://www.w3.org/2000/svg"
                         width="16"
                         height="16"
                         fill="currentColor"
                         className="bi bi-arrow-left-circle-fill"
                         viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                    </svg>
                    Wróć do listy
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
                    <td>{entry.entry.equivalent}</td>
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