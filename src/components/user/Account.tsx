import React, {useContext, useEffect} from "react";
import {LoginContext} from "../../contexts/login.context";
import {useNavigate} from "react-router-dom";

export const Account = () => {
    const {loggedIn, userName} = useContext(LoginContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/user/login');
        }
    }, []);

    return <div className="container p-3">
        <h2 className="my-5 theme-text-mainbrand">Twoje dane</h2>

    </div>
}