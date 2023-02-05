import React, {FormEvent, useState} from "react";
import './AddTerm.css';
import './style.css';
import {Spinner} from "./Spinner";
import {CreateEntryReq} from "types";

export const AddTerm = () => {
    const [entry, setEntry] = useState<CreateEntryReq>({
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

    const [loading, setLoading] = useState<boolean>(false);

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        await fetch('http://localhost:3001/terms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry),
        });
    };

    const updateForm = (key: string, value: any) => {
        setEntry(entry => ({
            ...entry,
            [key]: value,
        }));
    };

    if (loading) {
        return <Spinner/>
    }

    return <div className="container p-3">
        <h2 className="mb-4">Dodawanie hasła</h2>
        <form onSubmit={sendForm}>
            <div className="mb-3">
                <label htmlFor="term"
                       className="form-label">Wyraz hasłowy</label>
                <input
                    type="text"
                    value={entry.term}
                    onChange={e => updateForm('term', e.target.value)}
                    maxLength={50}
                    className="form-control"
                    id="term"
                    aria-describedby="termHelp"
                    required
                />
                <div id="termHelp"
                     className="form-text">Pole obowiązkowe. Wyraz hasłowy może mieć od 3 do 50 znaków. Może składać się
                    z kilku wyrazów.
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="termSource"
                       className="form-label">Źródło</label>
                <input
                    type="text"
                    value={entry.termSource}
                    onChange={e => updateForm('termSource', e.target.value)}
                    maxLength={100}
                    className="form-control"
                    id="termSource"
                    aria-describedby="termSourceHelp"
                />
                <div id="termSourceHelp"
                     className="form-text">Np. link lub tytuł tekstu.
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="termDefinition"
                       className="form-label">Definicja</label>
                <textarea
                    value={entry.termDefinition}
                    onChange={e => updateForm('termDefinition', e.target.value)}
                    maxLength={300}
                    className="form-control"
                    id="termDefinition"
                    aria-describedby="termDefinitionHelp"
                />
                <div id="termDefinitionHelp"
                     className="form-text">Maksymalnie 300 znaków.
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="termDefinitionSource"
                       className="form-label">Źródło definicji</label>
                <input
                    type="text"
                    value={entry.termDefinitionSource}
                    onChange={e => updateForm('termDefinitionSource', e.target.value)}
                    maxLength={100}
                    className="form-control"
                    id="termDefinitionSource"
                    aria-describedby="termDefinitionSourceHelp"
                />
                <div id="termDefinitionSourceHelp"
                     className="form-text">Np. link lub tytuł tekstu.
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="termCollocations"
                       className="form-label">Kolokacje</label>
                <textarea
                    value={entry.termCollocations}
                    onChange={e => updateForm('termCollocations', e.target.value)}
                    maxLength={300}
                    className="form-control"
                    id="termCollocations"
                    aria-describedby="termCollocationsHelp"
                />
                <div id="termCollocationsHelp"
                     className="form-text">Możesz wypisać wyrażenia od nowego wiersza lub po przecinku.
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="equivalent"
                       className="form-label">Ekwiwalent</label>
                <input
                    type="text"
                    value={entry.equivalent}
                    onChange={e => updateForm('equivalent', e.target.value)}
                    maxLength={50}
                    className="form-control"
                    id="equivalent"
                    aria-describedby="equivalentHelp"
                    required
                />
                <div id="equivalentHelp"
                     className="form-text">Pole obowiązkowe. Ekwiwalent może mieć od 3 do 50 znaków. Może składać się z
                    kilku wyrazów.
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="equivalentSource"
                       className="form-label">Źródło</label>
                <input
                    type="text"
                    value={entry.equivalentSource}
                    onChange={e => updateForm('equivalentSource', e.target.value)}
                    maxLength={100}
                    className="form-control"
                    id="equivalentSource"
                    aria-describedby="equivalentSourceHelp"
                />
                <div id="equivalentSourceHelp"
                     className="form-text">Np. link lub tytuł tekstu.
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="equivalentDefinition"
                       className="form-label">Definicja</label>
                <textarea
                    value={entry.equivalentDefinition}
                    onChange={e => updateForm('equivalentDefinition', e.target.value)}
                    maxLength={300}
                    className="form-control"
                    id="equivalentDefinition"
                    aria-describedby="equivalentDefinitionHelp"
                />
                <div id="equivalentDefinitionHelp"
                     className="form-text">Maksymalnie 300 znaków.
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="equivalentDefinitionSource"
                       className="form-label">Źródło definicji</label>
                <input
                    type="text"
                    value={entry.equivalentDefinitionSource}
                    onChange={e => updateForm('equivalentDefinitionSource', e.target.value)}
                    maxLength={100}
                    className="form-control"
                    id="equivalentDefinitionSource"
                    aria-describedby="equivalentDefinitionSourceHelp"
                />
                <div id="equivalentDefinitionSourceHelp"
                     className="form-text">Np. link lub tytuł tekstu.
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="equivalentCollocations"
                       className="form-label">Kolokacje</label>
                <textarea
                    value={entry.equivalentCollocations}
                    onChange={e => updateForm('equivalentCollocations', e.target.value)}
                    maxLength={300}
                    className="form-control"
                    id="equivalentCollocations"
                    aria-describedby="equivalentCollocationsHelp"
                />
                <div id="equivalentCollocationsHelp"
                     className="form-text">Możesz wypisać wyrażenia od nowego wiersza lub po przecinku.
                </div>
            </div>
            <button type="submit"
                    className="btn theme-btn-mainbrand border-2">Zapisz
            </button>
        </form>
    </div>
}