import React, {BaseSyntheticEvent, useContext, useEffect} from "react";
import {LoginContext} from "../../contexts/login.context";
import {Link, useNavigate} from "react-router-dom";

export const Dashboard = () => {
    const {loggedIn, setLoggedIn, userName} = useContext(LoginContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/user/login');
        }
    }, [loggedIn]);


    const logOut = (e: BaseSyntheticEvent) => {
        setLoggedIn(false);
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
                    <Link to={`/user/${userName}/termbases`}
                          className="btn theme-btn-mainbrand">Zobacz</Link>
                </div>
            </div>
            <div className="card col-10 col-lg-3 col-md-5 d-flex text-center mb-4 mx-4 theme-border-lightaccent shadow">
                <div className="card-body">
                    <p className="text-center display-6 theme-text-lightaccent">
                        <i className="bi bi-person-circle"></i>
                    </p>
                    <h3 className="card-title mb-4 fs-4 theme-text-dark">Twoje dane</h3>
                    <Link to={`/user/${userName}/account`}
                          className="btn theme-btn-lightaccent">Edytuj</Link>
                </div>
            </div>
            <div className="card col-10 col-lg-3 col-md-5 d-flex text-center mb-4 mx-4 theme-border-darkaccent shadow">
                <div className="card-body">
                    <p className="text-center display-6 theme-text-darkaccent">
                        <i className="bi bi-toggle-off"></i>
                    </p>
                    <h3 className="card-title mb-4 fs-4 theme-text-dark">Zakończ pracę</h3>
                    <button
                        className="btn theme-btn-darkaccent"
                        onClick={logOut}
                    >Wyloguj
                    </button>
                </div>
            </div>
        </div>
    </div>
}