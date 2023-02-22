import React, {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../contexts/login.context";
import {useNavigate} from "react-router-dom";
import {ConfirmDeleteModal} from "../common/ConfirmDeleteModal";

export const Account = () => {
    const [showModal, setShowModal] = useState(false);

    const {loggedIn, setLoggedIn, userName} = useContext(LoginContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/user/login');
        }
    }, []);

    const deleteUser = async () => {
        await fetch(`http://localhost:3001/user/${userName}`, {
            method: 'DELETE',
        });
        setShowModal(false);
        setLoggedIn(false);
        navigate('/');
    }

    return <div className="container p-3">
        <h2 className="my-5 theme-text-mainbrand">Twoje dane</h2>
        <div className="delete-wrap">
            <button
                className="btn btn-lg theme-btn-darkaccent mx-1 my-1 my-md-0"
                onClick={() => setShowModal(true)}
            >
                Usuń konto
            </button>
            <ConfirmDeleteModal
                showModal={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={deleteUser}
            >
                <div>Czy na pewno chcesz usunąć swoje konto?</div>
            </ConfirmDeleteModal>
        </div>
    </div>
}