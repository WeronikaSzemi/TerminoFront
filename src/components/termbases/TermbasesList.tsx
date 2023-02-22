import React, {BaseSyntheticEvent, useContext, useEffect, useState} from "react";
import {LoginContext} from "../../contexts/login.context";
import {Link, useNavigate} from "react-router-dom";
import {TermbaseEntity} from 'types';
import {Spinner} from "../Spinner/Spinner";
import {TermbasesTable} from "./TermbasesTable";
import {AddTermbase} from "./AddTermbase";

export const TermbasesList = () => {
    const [termbaseList, setTermbaseList] = useState<TermbaseEntity[] | null>(null);
    const [showForm, setShowForm] = useState(false);

    const {loggedIn, userName} = useContext(LoginContext);

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!loggedIn) {
    //         navigate('/user/login');
    //     }
    // }, []);

    const refreshList = async () => {
        setTermbaseList(null);

        const res = await fetch(`http://localhost:3001/user/${userName}/termbases`);
        const data = await res.json();
        setTermbaseList(data.termbaseList);
        setShowForm(false);
    };

    useEffect(() => {
        (async () => {
            await refreshList();
        })();
    }, []);

    if (termbaseList === null) {
        return <Spinner/>
    }

    const handleShowForm = (e: BaseSyntheticEvent) => {
        e.preventDefault();

        setShowForm(true);
    }

    return <div className="container p-3">
        <h2 className="my-5 theme-text-mainbrand">Twoje słowniki</h2>
        <button
            className="btn theme-btn-light-main mb-5"
            onClick={handleShowForm}
        >
            Stwórz nowy słownik
        </button>
        <Link
            to={`/user/${userName}`}
            className="btn theme-btn-light-darkaccent mb-5 ms-3"
        >
            Wróć do panelu
        </Link>
        <div>
            {showForm ? <AddTermbase onListChange={refreshList}/> : null}
        </div>
        <TermbasesTable termbaseList={termbaseList}
                        onListChange={refreshList}
        />
    </div>
}