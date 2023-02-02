import React, {FormEvent, useState} from "react";
import './AddTerm.css';

export const EditTerm = () => {
    // const getTerms = async () => {
    //     const res = await fetch('http://localhost:3001/terms/edit/')
    // }

    const [entry, setEntry] = useState({
        term: '',
        termSource: '',
        termDefinition: '',
        termDefinitionSource: '',
        termCollocations: '',
        equivalent: '',
        equivalentSource: '',
        equivalentDefinition: '',
        equivalentDefinitionSource: '',
        equivalentCollocations: '',
    });

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        await fetch('http://localhost:3001/terms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry),
        });
        console.log(entry);
    };

    const updateForm = (key: string, value: any) => {
        setEntry(entry => ({
            ...entry,
            [key]: value,
        }));
    };

    return <>
        <h2>Edycja hasła</h2>
        <form onSubmit={sendForm}>
            <label>
                <p>Termin:</p>
                <input
                    type="text"
                    value={entry.term}
                    onChange={e => updateForm('term', e.target.value)}
                    maxLength={50}
                    required
                />*
            </label><br/>
            <label>
                <p>Źródło:</p>
                <input
                    type="text"
                    value={entry.termSource}
                    onChange={e => updateForm('termSource', e.target.value)}
                    maxLength={100}
                />
            </label><br/>
            <label>
                <p>Definicja:</p>
                <textarea
                    value={entry.termDefinition}
                    onChange={e => updateForm('termDefinition', e.target.value)}
                    maxLength={300}
                />
            </label><br/>
            <label>
                <p>Źródło definicji:</p>
                <input
                    type="text"
                    value={entry.termDefinitionSource}
                    onChange={e => updateForm('termDefinitionSource', e.target.value)}
                    maxLength={100}
                />
            </label><br/>
            <label>
                <p>Kolokacje:</p>
                <textarea
                    value={entry.termCollocations}
                    onChange={e => updateForm('termCollocations', e.target.value)}
                    maxLength={300}
                />
            </label><br/>
            <label>
                <p>Ekwiwalent:</p>
                <input
                    type="text"
                    value={entry.equivalent}
                    onChange={e => updateForm('equivalent', e.target.value)}
                    maxLength={50}
                    required
                />*
            </label><br/>
            <label>
                <p>Źródło:</p>
                <input
                    type="text"
                    value={entry.equivalentSource}
                    onChange={e => updateForm('equivalentSource', e.target.value)}
                    maxLength={100}
                />
            </label><br/>
            <label>
                <p>Definicja:</p>
                <textarea
                    value={entry.equivalentDefinition}
                    onChange={e => updateForm('equivalentDefinition', e.target.value)}
                    maxLength={300}
                />
            </label><br/>
            <label>
                <p>Źródło definicji:</p>
                <input
                    type="text"
                    value={entry.equivalentDefinitionSource}
                    onChange={e => updateForm('equivalentDefinitionSource', e.target.value)}
                    maxLength={100}
                />
            </label><br/>
            <label>
                <p>Kolokacje:</p>
                <textarea
                    value={entry.equivalentCollocations}
                    onChange={e => updateForm('equivalentCollocations', e.target.value)}
                    maxLength={300}
                />
            </label><br/>
            <button type="submit">Zapisz</button>
        </form>
    </>
}