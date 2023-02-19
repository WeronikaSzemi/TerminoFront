import React, {useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import {TermbaseEntity} from 'types';
import {LoginContext} from "../../contexts/login.context";

interface Props {
    termbase: TermbaseEntity,
    onListChange: () => void,
}

export const DeleteTermbaseConfirm = (props: Props) => {
    const [show, setShow] = useState(true);
    const {userName} = useContext(LoginContext);

    const deleteEntry = async (e: React.MouseEvent) => {
        e.preventDefault();

        await fetch(`http://localhost:3001/${userName}/${props.termbase.termbaseName}`, {
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