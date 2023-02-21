import React, {useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import {TermEntity} from 'types';
import {LoginContext} from "../../contexts/login.context";
import {TermbaseContext} from "../../contexts/termbase.context";

interface Props {
    term: TermEntity,
    onListChange: () => void,
}

export const DeleteTermConfirm = (props: Props) => {
    const [show, setShow] = useState(true);

    const {userName} = useContext(LoginContext);
    const {termbaseName} = useContext(TermbaseContext);

    const deleteEntry = async (e: React.MouseEvent) => {
        e.preventDefault();

        await fetch(`http://localhost:3001/user/${userName}/termbases/${termbaseName}/${props.term.id}`, {
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
            Czy na pewno chcesz usunąć hasło „{props.term.term}”?
            <div className="d-flex justify-content-end">
                <Button className="btn btn-sm theme-btn-darkaccent mx-1 mt-2"
                        onClick={deleteEntry}>Tak</Button>
                <Button className="btn btn-sm theme-btn-mainbrand mx-1 mt-2"
                        onClick={cancelDelete}>Anuluj</Button>
            </div>
        </Alert>
    </>
}