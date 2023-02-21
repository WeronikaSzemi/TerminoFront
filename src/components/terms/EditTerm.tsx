import React, {ComponentState, FormEvent, useContext, useEffect, useState} from "react";
import './AddTerm.css';
import '../style.css';
import {Link, useParams} from "react-router-dom";
import {Spinner} from "../Spinner/Spinner";
import {TermEntity} from "types";
import {Simulate} from "react-dom/test-utils";
import {Menu} from "../homepage/Menu";
import {LoginContext} from "../../contexts/login.context";
import {TermbaseContext} from "../../contexts/termbase.context";
import input = Simulate.input;

export const EditTerm = () => {
    const [entry, setEntry] = useState<TermEntity | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [resultInfo, setResultInfo] = useState<string | null>(null);

    const {userName} = useContext(LoginContext);
    const {termbaseName} = useContext(TermbaseContext);

    const {termId} = useParams();

    useEffect(() => {

        (async () => {
            const res = await fetch(`http://localhost:3001/user/${userName}/termbases/${termbaseName}/${termId}`);
            const data = await res.json();
            setEntry(data.entry);
        })();
    }, []);

    if (entry === null) {
        return null;
    }

    const updateEntry = (e: any) => {
        setEntry(entry => ({
            ...entry,
            [e.target.id]: e.target.value,
        } as ComponentState));
    };

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        const res = await fetch(`http://localhost:3001/user/${userName}/termbases/${termbaseName}/${termId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry),
        });

        setLoading(false);
        setResultInfo(`Hasło „${entry.term}” zostało zmodyfikowane.`);
    };

    if (resultInfo !== null) {
        return <>
            <Menu/>
            <div className="container text-center theme-bg-light theme-border-mainbrand border-4 p-3 mt-5">
                <p className="fs-5">{resultInfo}</p>
                <Link to={`/termbases/sampletermbase`}
                      className="btn btn-sm theme-btn-mainbrand mx-1 my-1 my-md-0"
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
        </>

    }

    if (loading) {
        return <Spinner/>
    }

    return <div className="container p-3">
        <h2 className="my-5 theme-text-mainbrand">Edycja hasła</h2>
        <div className="row">
            <form onSubmit={sendForm}
                  className="col-12 col-md-10 col-lg-8">
                <div className="mb-3">
                    <label htmlFor="term"
                           className="form-label fw-bold">Wyraz hasłowy</label>
                    <input
                        type="text"
                        value={entry.term}
                        onChange={e => updateEntry(e)}
                        maxLength={50}
                        className="form-control"
                        id="term"
                        aria-describedby="termHelp"
                        required
                    />
                    <div id="termHelp"
                         className="form-text">Pole obowiązkowe. Wyraz hasłowy może mieć od 3 do 50 znaków. Może składać
                        się
                        z kilku wyrazów.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="termSource"
                           className="form-label fw-bold">Źródło</label>
                    <input
                        type="text"
                        value={entry.termSource}
                        onChange={e => updateEntry(e)}
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
                       className="form-label fw-bold">Definicja</label>
                <textarea
                    value={entry.termDefinition}
                    onChange={e => updateEntry(e)}
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
                       className="form-label fw-bold">Źródło definicji</label>
                <input
                    type="text"
                    value={entry.termDefinitionSource}
                    onChange={e => updateEntry(e)}
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
                       className="form-label fw-bold">Kolokacje</label>
                <textarea
                    value={entry.termCollocations}
                    onChange={e => updateEntry(e)}
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
                       className="form-label fw-bold">Ekwiwalent</label>
                <input
                    type="text"
                    value={entry.equivalent}
                    onChange={e => updateEntry(e)}
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
                       className="form-label fw-bold">Źródło</label>
                <input
                    type="text"
                    value={entry.equivalentSource}
                    onChange={e => updateEntry(e)}
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
                       className="form-label fw-bold">Definicja</label>
                <textarea
                    value={entry.equivalentDefinition}
                    onChange={e => updateEntry(e)}
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
                       className="form-label fw-bold">Źródło definicji</label>
                <input
                    type="text"
                    value={entry.equivalentDefinitionSource}
                    onChange={e => updateEntry(e)}
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
                       className="form-label fw-bold">Kolokacje</label>
                <textarea
                    value={entry.equivalentCollocations}
                    onChange={e => updateEntry(e)}
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
            <Link to={`/termbases/sampletermbase`}
                  className="btn theme-btn-lightaccent mx-1 my-1 my-md-0"
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
                Anuluj i wróć do listy
            </Link>
            </form>
        </div>
    </div>
}