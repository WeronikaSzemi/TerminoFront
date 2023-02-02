import React from "react";
import {Link} from "react-router-dom";

export const LoginOrRegister = () => {
    return <>
        <div className="container">
            <div className="row mt-5 mb-5">
                <div className="col-sm-5">
                    <div className="card p-3 text-center">
                        <div className="card-body">
                            <h3 className="card-title pb-2">Masz już konto?</h3>
                            <p className="card-text">Przejrzyj zebrane słownictwo i dodaj nowe terminy</p>
                            <Link to="/login"
                                  className="btn btn-primary">Zaloguj się</Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-5">
                    <div className="card p-3 text-center">
                        <div className="card-body">
                            <h3 className="card-title pb-2">Chcesz dołączyć?</h3>
                            <p className="card-text">Stwórz swoją pierwszą bazę terminologiczną</p>
                            <Link to="/register"
                                  className="btn btn-primary">Zarejestruj się</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}