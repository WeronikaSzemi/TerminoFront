import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
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