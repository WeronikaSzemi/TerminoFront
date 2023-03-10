import React, {ComponentState, FormEvent, useContext, useEffect, useState} from "react";
import './AddTerm.css';
import '../style.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Spinner} from "../Spinner/Spinner";
import {TermEntity} from "types";
import {Simulate} from "react-dom/test-utils";
import {LoginContext} from "../../contexts/login.context";
import {TermbaseContext} from "../../contexts/termbase.context";
import input = Simulate.input;

export const EditTerm = () => {
    const [entry, setEntry] = useState<TermEntity | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const {userName, loggedIn} = useContext(LoginContext);
    const {termbaseName} = useContext(TermbaseContext);

    const {termId} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/user/login');
        }
    }, []);

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
        try {
            const res = await fetch(`http://localhost:3001/user/${userName}/termbases/${termbaseName}/${termId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entry),
            });
        } finally {
            setLoading(false);
            navigate(`/user/${userName}/termbases/${termbaseName}/${termId}`);
        }
    };

    if (loading) {
        return <Spinner/>
    }

    return <div className="container p-3">
        <h2 className="my-5 theme-text-mainbrand">Edycja has??a</h2>
        <Link to={`/user/${userName}/termbases/${termbaseName}`}
              className="btn theme-btn-light-darkaccent mb-5 me-3"
        >
            Wr???? do listy hase??
        </Link>
        <div className="my-3">
            <form onSubmit={sendForm}
                  className="col-12 col-md-10 col-lg-8">
                <div className="mb-3">
                    <label htmlFor="term"
                           className="form-label fw-bold theme-text-mainbrand">Wyraz has??owy</label>
                    <input
                        type="text"
                        value={entry.term}
                        onChange={e => updateEntry(e)}
                        maxLength={50}
                        minLength={3}
                        className="form-control theme-border-mainbrand"
                        id="term"
                        aria-describedby="termHelp"
                        required
                    />
                    <div id="termHelp"
                         className="form-text"><span className="theme-text-darkaccent">Pole obowi??zkowe.</span> Wyraz
                        has??owy mo??e mie?? od 3 do 50 znak??w. Mo??e sk??ada?? si??
                        z kilku wyraz??w.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="termSource"
                           className="form-label fw-bold">??r??d??o</label>
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
                         className="form-text">Np. link lub tytu?? tekstu.
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
                         className="form-text">Maksymalnie 300 znak??w.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="termDefinitionSource"
                           className="form-label fw-bold">??r??d??o definicji</label>
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
                         className="form-text">Np. link lub tytu?? tekstu.
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
                         className="form-text">
                        Wypisz wyra??enia po przecinku.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="equivalent"
                           className="form-label fw-bold theme-text-mainbrand">Ekwiwalent</label>
                    <input
                        type="text"
                        value={entry.equivalent}
                        onChange={e => updateEntry(e)}
                        maxLength={50}
                        minLength={3}
                        className="form-control theme-border-mainbrand"
                        id="equivalent"
                        aria-describedby="equivalentHelp"
                        required
                    />
                    <div id="equivalentHelp"
                         className="form-text">
                        <span className="theme-text-darkaccent">Pole obowi??zkowe.</span> Ekwiwalent
                        mo??e mie?? od 3 do 50 znak??w. Mo??e sk??ada?? si?? z
                        kilku wyraz??w.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="equivalentSource"
                           className="form-label fw-bold">??r??d??o</label>
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
                         className="form-text">Np. link lub tytu?? tekstu.
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
                         className="form-text">Maksymalnie 300 znak??w.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="equivalentDefinitionSource"
                           className="form-label fw-bold">??r??d??o definicji</label>
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
                         className="form-text">Np. link lub tytu?? tekstu.
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
                         className="form-text">Wypisz wyra??enia po przecinku.
                    </div>
                </div>
                <div className="my-4 container">
                    <div className="row justify-content-between">
                        <button type="submit"
                                className="col-12 col-sm-8 btn theme-btn-mainbrand border-2">Zapisz
                        </button>
                        <Link to={`/user/${userName}/termbases/${termbaseName}`}
                              className="col-3 mt-3 mt-sm-0 btn theme-btn-darkaccent"
                        >
                            Anuluj
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    </div>
}