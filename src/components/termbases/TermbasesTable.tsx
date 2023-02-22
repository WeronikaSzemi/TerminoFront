import React, {useContext, useEffect} from "react";
import {TermbaseEntity} from 'types';
import {TermbasesTableRow} from "./TermbasesTableRow";
import {LoginContext} from "../../contexts/login.context";
import {useNavigate} from "react-router-dom";

interface Props {
    termbaseList: TermbaseEntity[],
    onListChange: () => void,
}

export const TermbasesTable = (props: Props) => {

    const {loggedIn} = useContext(LoginContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/user/login');
        }
    }, []);

    return <table className="table table-striped TermsTable align-middle">
        <thead className="theme-bg-dark theme-text-light">
        <tr>
            <th>Nazwa słownika</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {
            props.termbaseList.map(termbase => (
                <TermbasesTableRow
                    termbase={termbase}
                    onListChange={props.onListChange}
                    key={termbase.termbaseId}
                />
            ))
        }
        </tbody>
    </table>
}