import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {GetSingleEntryRes} from "types";
import {LoginContext} from "../../contexts/login.context";
import {TermbaseContext} from "../../contexts/termbase.context";
import {ConfirmDeleteModal} from "../common/ConfirmDeleteModal";
import './TermsTable.css';
import '../style.css';


export const SingleTerm = () => {
    const [entry, setEntry] = useState<GetSingleEntryRes | null>(null);
    const [showModal, setShowModal] = useState(false);

    const {termId} = useParams();

    const {userName, loggedIn} = useContext(LoginContext);
    const {termbaseName} = useContext(TermbaseContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/user/login');
        }
    }, []);

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/user/${userName}/termbases/${termbaseName}/${termId}`);
            setEntry(await res.json());
        })();
    }, []);

    const deleteEntry = async () => {
        await fetch(`http://localhost:3001/user/${userName}/termbases/${termbaseName}/${termId}`, {
            method: 'DELETE',
        });
        navigate(`/user/${userName}/termbases/${termbaseName}`);
    }

    if (entry === null) {
        return null;
    }

    return <>
        <div className="container mt-5">
            <h2 className="my-5 theme-text-mainbrand">{entry.entry.term}</h2>
            <div className="my-3">
                <div className="delete-wrap">
                    <Link to={`/user/${userName}/termbases/${termbaseName}/${entry.entry.id}/edit`}
                          className="btn theme-btn-light-main mb-5 me-3"
                    >
                        Edytuj
                    </Link>
                    <button
                        className="btn theme-btn-darkaccent border-3 mb-5 me-3"
                        onClick={() => setShowModal(true)}
                    >
                        Usuń
                    </button>
                    <ConfirmDeleteModal
                        showModal={showModal}
                        onClose={() => setShowModal(false)}
                        onConfirm={deleteEntry}
                    >
                        <div>Czy na pewno chcesz usunąć hasło „{entry.entry.term}”?</div>
                    </ConfirmDeleteModal>
                    <Link to={`/user/${userName}/termbases/${termbaseName}`}
                          className="btn theme-btn-light-darkaccent mb-5 me-3"
                    >
                        Wróć do listy haseł
                    </Link>
                </div>
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