import React, {useContext, useEffect, useState} from "react";
import {TermEntity} from 'types';
import {TermsTable} from "./TermsTable";
import {Spinner} from "../Spinner/Spinner";
import {LoginContext} from "../../contexts/login.context";
import {Link, useNavigate} from "react-router-dom";
import {TermbaseContext} from "../../contexts/termbase.context";
import {ConfirmDeleteModal} from "../common/ConfirmDeleteModal";

export const TermsList = () => {
    const [termList, setTermList] = useState<TermEntity[] | null>(null);
    const [showModal, setShowModal] = useState(false);

    const {userName, loggedIn} = useContext(LoginContext);
    const {termbaseName} = useContext(TermbaseContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/user/login');
        }
    }, []);

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

    const deleteTermbase = async () => {
        await fetch(`http://localhost:3001/user/${userName}/termbases/${termbaseName}`, {
            method: 'DELETE',
        });
        setShowModal(false);
        navigate(`/user/${userName}/termbases/`);
    }

    if (termList === null) {
        return <Spinner/>
    }

    return <>
        <div className="container p-3">
            <h2 className="my-5 theme-text-mainbrand">{termbaseName}</h2>
            <div className="delete-wrap">
                <Link
                    to={`/user/${userName}/termbases/${termbaseName}/addTerm`}
                    className="btn theme-btn-light-main mb-5 me-3"
                >
                    Dodaj hasło
                </Link>
                <button
                    className="btn theme-btn-darkaccent border-3 mb-5 me-3"
                    onClick={() => setShowModal(true)}
                >
                    Usuń słownik
                </button>
                <ConfirmDeleteModal
                    showModal={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={deleteTermbase}
                >
                    <div>Czy na pewno chcesz usunąć słownik „{termbaseName}”?</div>
                </ConfirmDeleteModal>
                <Link
                    to={`/user/${userName}/termbases`}
                    className="btn theme-btn-light-darkaccent mb-5 me-3"
                    state={termbaseName}
                >
                    Wróć do listy słowników
                </Link>
            </div>
            <TermsTable terms={termList}
                        onListChange={refreshList}
            />
        </div>

    </>;
}