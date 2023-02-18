import React from "react";
import {TermbaseEntity} from 'types';
import {UserTermbasesTableRow} from "./UserTermbasesTableRow";

interface Props {
    termbaseList: TermbaseEntity[],
    onListChange: () => void,
}

export const UserTermbasesTable = (props: Props) => {
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
                <UserTermbasesTableRow
                    termbase={termbase}
                    onListChange={props.onListChange}
                    key={termbase.termbaseId}
                />
            ))
        }
        </tbody>
    </table>
}