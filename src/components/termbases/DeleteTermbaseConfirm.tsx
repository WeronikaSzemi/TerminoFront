import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import {TermbaseEntity} from 'types';

interface Props {
    termbase: TermbaseEntity,
    onListChange: () => void,
}

export const DeleteTermbaseConfirm = (props: Props) => {
    const [show, setShow] = useState(true);

    const deleteEntry = async (e: React.MouseEvent) => {
        e.preventDefault();

        await fetch(`http://localhost:3001/terms/${props.termbase.termbaseId}`, {
            method: 'DELETE',
        });
        props.onListChange();
    }

    const cancelDelete = () => {
        setShow(false);
        props.onListChange();
    }

    return <>
        <Alert show={show}
               variant='danger'>
            Czy na pewno chcesz usunąć słownik „{props.termbase.termbaseName}”?
            <div className="d-flex justify-content-end">
                <Button className="btn btn-sm theme-btn-darkaccent mx-1 mt-2"
                        onClick={deleteEntry}>Tak</Button>
                <Button className="btn btn-sm theme-btn-mainbrand mx-1 mt-2"
                        onClick={cancelDelete}>Anuluj</Button>
            </div>
        </Alert>
    </>
}