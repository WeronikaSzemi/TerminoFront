import React, {useContext} from "react";
import {LoginContext} from "../../contexts/login.context";
import {useNavigate} from "react-router-dom";

export const Dashboard = () => {
    const {loggedIn, userName} = useContext(LoginContext);

    const navigate = useNavigate();

    if (!loggedIn) {
        navigate('/user/login');
    }

    return <div className="container p-3">
        <div className="row align-items-center">
            <h2 className="my-5 theme-text-mainbrand">Witaj, {userName}!</h2>

            <div className="card col-8 col-sm-6 col-md-3 d-flex text-center mb-4 mx-4 theme-border-mainbrand">
                <div className="card-body">
                    <p className="text-center display-6 theme-text-mainbrand">
                        <i className="bi bi-book"></i>
                    </p>
                    <h3 className="mb-4 fs-4 card-title theme-text-dark">Twoje słowniki</h3>
                    <button className="btn theme-btn-mainbrand">Zobacz</button>
                </div>
            </div>
            <div className="card col-8 col-sm-6 col-md-3 d-flex text-center mb-4 mx-4 theme-border-lightaccent">
                <div className="card-body">
                    <p className="text-center display-6 theme-text-lightaccent">
                        <i className="bi bi-person-circle"></i>
                    </p>
                    <h3 className="mb-4 fs-4 card-title theme-text-dark">Twoje dane</h3>
                    <button className="btn theme-btn-lightaccent">Edytuj</button>
                </div>
            </div>
            <div className="card col-8 col-sm-6 col-md-3 d-flex text-center mb-4 mx-4 theme-border-darkaccent">
                <div className="card-body">
                    <p className="text-center display-6 theme-text-darkaccent">
                        <i className="bi bi-toggle-off"></i>
                    </p>
                    <h3 className="mb-4 fs-4 card-title theme-text-dark">Zakończ pracę</h3>
                    <button className="btn theme-btn-darkaccent">Wyloguj</button>
                </div>
            </div>

        </div>
    </div>

}