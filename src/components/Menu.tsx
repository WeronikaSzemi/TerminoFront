import React from "react";
import {Link} from "react-router-dom";
import "./style.css";

export const Menu = () => {
    return <>
        <div className="navbar navbar-expand-lg sticky-top theme-bg-lightaccent">
            <div className="container-fluid">
                <a href="/"
                   className="navbar-brand">
                    <img
                        src="/images/logo.png"
                        alt="Logo Termino"
                        height="48"
                        className="d-inline-block"
                    />
                </a>
                <button className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navigation"
                        aria-controls="navigation"
                        aria-expanded="false"
                        aria-label="Przełącz nawigację">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/*@todo: sprawić, żeby ikona od zwijania menu była widoczna*/}
                <div className="collapse navbar-collapse mt-3 mt-lg-0 me-auto"
                     id="navigation">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link"
                               href="#">O Termino</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"
                               href="#">Zaloguj się</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"
                               href="#">Zarejestruj się</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"
                               href="#">Kontakt</a>
                        </li>
                    </ul>
                    <Link to="/termbases/sampletermbase"
                          className="ms-auto btn theme-btn-light-darkaccent border-2 my-4 my-lg-0">Wypróbuj
                        Termino</Link>

                </div>
            </div>
        </div>
    </>
};