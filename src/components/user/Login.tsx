import React, {FormEvent, useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {LoginContext} from "../../contexts/login.context";

export const Login = () => {
    const [user, setUser] = useState({
        userName: '',
        password: '',
    });
    const [message, setMessage] = useState({
        content: '',
        style: '',
    });

    const {loggedIn, setLoggedIn, setUserName} = useContext(LoginContext);

    const navigate = useNavigate();

    const updateForm = (key: string, value: any) => {
        setUser(user => ({
            ...user,
            [key]: value,
        }));
    };

    useEffect(() => {
        if (loggedIn) {
            navigate(`/user/${user.userName}`);
        }
    }, [loggedIn]);

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:3001/user/login/${user.userName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const {result} = await res.json();

        if (!result) {
            setMessage({
                content: 'Logowanie nie powiodło się. Nieprawidłowe hasło lub nazwa użytkownika_czki.',
                style: 'container mt-3 border border-3 theme-border-darkaccent rounded py-1 px-4',
            });
            setLoggedIn(false);
        } else {
            setMessage({
                content: '',
                style: '',
            });
            setLoggedIn(true);
            setUserName(user.userName);
        }
    };

    return <div className="container p-3">
        <h2 className="my-5 theme-text-mainbrand">Logowanie</h2>
        <div className="card w-50 p-3 theme-border-mainbrand">
            <form onSubmit={sendForm}>
                <div className="mb-3">
                    <label htmlFor="userName"
                           className="form-label fw-bold">Nazwa użytkownika_czki</label>
                    <input
                        type="text"
                        value={user.userName}
                        onChange={e => updateForm('userName', e.target.value)}
                        maxLength={30}
                        className="form-control"
                        id="userName"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password"
                           className="form-label fw-bold">Hasło</label>
                    <input
                        type="password"
                        value={user.password}
                        onChange={e => updateForm('password', e.target.value)}
                        maxLength={50}
                        className="form-control"
                        id="password"
                        required
                    />
                </div>
                <button type="submit"
                        className="btn theme-btn-mainbrand border-2 w-100"
                >Zaloguj
                </button>
                <p className="mt-3 mb-2">Nie masz konta? <Link to={'/user/register'}
                                                               className="theme-text-mainbrand">Zarejestruj się</Link>.
                </p>
            </form>
            <div className={message.style}>{message.content}</div>
        </div>
    </div>
}