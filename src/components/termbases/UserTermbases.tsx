import React, {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../contexts/login.context";
import {useNavigate} from "react-router-dom";
import {TermbaseEntity} from 'types';
import {Spinner} from "../Spinner/Spinner";
import {UserTermbasesTable} from "./UserTermbasesTable";

export const UserTermbases = () => {
    const [termbaseList, setTermbaseList] = useState<TermbaseEntity[] | null>(null);

    const {loggedIn, userName} = useContext(LoginContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/user/login');
        }
    }, []);

    const refreshList = async () => {
        setTermbaseList(null);
        const res = await fetch(`http://localhost:3001/user/${userName}/termbases`);
        const data = await res.json();
        setTermbaseList(data.termbaseList);
    };

    useEffect(() => {
        (async () => {
            await refreshList();
        })();
    }, []);

    if (termbaseList === null) {
        return <Spinner/>
    }

    return <div className="container p-3">
        <h2 className="my-5 theme-text-mainbrand">Twoje słowniki</h2>
        <UserTermbasesTable termbaseList={termbaseList}
                            onListChange={refreshList}/>
    </div>
}