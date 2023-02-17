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
        <div className="row">
            <h2 className="my-5 theme-text-mainbrand">Witaj, {userName}!</h2>

            <div className="card col-10 col-lg-3 col-md-5 d-flex text-center mb-4 mx-4 theme-border-mainbrand shadow">
                <div className="card-body">
                    <p className="text-center display-6 theme-text-mainbrand">
                        <i className="bi bi-book"></i>
                    </p>
                    <h3 className="card-title mb-4 fs-4 theme-text-dark">Twoje słowniki</h3>
                    <button className="btn theme-btn-mainbrand">Zobacz</button>
                </div>
            </div>
            <div className="card col-10 col-lg-3 col-md-5 d-flex text-center mb-4 mx-4 theme-border-lightaccent shadow">
                <div className="card-body">
                    <p className="text-center display-6 theme-text-lightaccent">
                        <i className="bi bi-person-circle"></i>
                    </p>
                    <h3 className="card-title mb-4 fs-4 theme-text-dark">Twoje dane</h3>
                    <button className="btn theme-btn-lightaccent">Edytuj</button>
                </div>
            </div>
            <div className="card col-10 col-lg-3 col-md-5 d-flex text-center mb-4 mx-4 theme-border-darkaccent shadow">
                <div className="card-body">
                    <p className="text-center display-6 theme-text-darkaccent">
                        <i className="bi bi-toggle-off"></i>
                    </p>
                    <h3 className="card-title mb-4 fs-4 theme-text-dark">Zakończ pracę</h3>
                    <button className="btn theme-btn-darkaccent">Wyloguj</button>
                </div>
            </div>

        </div>
    </div>
}