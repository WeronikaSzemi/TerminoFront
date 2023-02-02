import React from "react";
import {TermEntity} from 'types';
import {TermsTableRow} from "./TermsTableRow";
import './TermsTable.css';

interface Props {
    terms: TermEntity[],
    onListChange: () => void;
}

export const TermsTable = (props: Props) => (
    <table className="table table-striped TermsTable align-middle">
        <thead className="theme-bg-dark theme-text-light">
        <tr>
            <th>Termin</th>
            <th>Ekwiwalent</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {
            props.terms.map(term => (
                <TermsTableRow
                    term={term}
                    onListChange={props.onListChange}
                    key={term.id}
                />
            ))
        }
        </tbody>
    </table>
);