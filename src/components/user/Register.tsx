import React, {FormEvent, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Spinner} from "../Spinner/Spinner";
import {newUser} from "types";

export const Register = () => {
    const [user, setUser] = useState<newUser>({
        userName: '',
        password: '',
        repeatPassword: '',
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [userNameVerifRes, setUserNameVerifRes] = useState({
        content: '',
        backgroundColor: '',
    });
    const [pwdVerifRes, setPwdVerifRes] = useState({
        submitDisabled: true,
        backgroundColor: '',
    });
    const [userRegistered, setUserRegistered] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        verifyUserName();
        verifyPassword();
    }, [user]);

    useEffect(() => {
        if (userRegistered) {
            navigate('/user/login');
        }
    }, [userRegistered]);

    const verifyUserName = async () => {
        const res = await fetch(`http://localhost:3001/user/login/${user.userName}`);
        const result = await res.json();

        if (result) {
            setUserNameVerifRes({
                content: `Nazwa jest już zajęta. Wybierz inną.`,
                backgroundColor: 'lightcoral',
            });
        } else {
            setUserNameVerifRes({
                content: '',
                backgroundColor: '',
            });
        }
    }

    const verifyPassword = () => {
        if (user.password !== user.repeatPassword) {
            setPwdVerifRes({
                submitDisabled: true,
                backgroundColor: 'lightcoral',
            });
        } else {
            setPwdVerifRes({
                submitDisabled: false,
                backgroundColor: '',
            });
        }
    }

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('http://localhost:3001/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            await res.json();
            setUserRegistered(true);
        } finally {
            setLoading(false);
        }
    };

    const updateForm = (key: string, value: any) => {
        setUser(user => ({
            ...user,
            [key]: value,
        }));
    };

    if (loading) {
        return <Spinner/>
    }
    return <div className="container p-3">
        <h2 className="my-5 theme-text-mainbrand">Rejestracja</h2>
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
                        style={{backgroundColor: userNameVerifRes.backgroundColor}}
                        aria-describedby="userNameHelp"
                        required
                    />
                    <div id="userNameHelp"
                         className="form-text">Pole obowiązkowe. Nazwa użytkownika_czki może mieć od 5 do 30 znaków.
                    </div>
                    <div className="form-text"
                         style={{color: 'lightcoral'}}>{userNameVerifRes.content}</div>
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
                    style={{backgroundColor: pwdVerifRes.backgroundColor}}
                    aria-describedby="passwordHelp"
                    required
                />
                <div id="passwordHelp"
                     className="form-text">Pole obowiązkowe. Hasło może składać się z od 5 do 15 znaków.
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="passwordConfirm"
                       className="form-label fw-bold">Powtórz hasło</label>
                <input
                    type="password"
                    value={user.repeatPassword}
                    onChange={e => updateForm('repeatPassword', e.target.value)}
                    maxLength={50}
                    className="form-control"
                    id="repeatPassword"
                    style={{backgroundColor: pwdVerifRes.backgroundColor}}
                    aria-describedby="repeatPasswordHelp"
                    required
                />
                <div id="repeatPasswordHelp"
                     className="form-text">Pole obowiązkowe. W obu polach hasło musi być identyczne.
                </div>
            </div>
                <button type="submit"
                        className="btn theme-btn-mainbrand border-2 w-100"
                        disabled={pwdVerifRes.submitDisabled}
                >Utwórz konto
                </button>
                <p className="mt-3 mb-2">Masz już konto? <Link to={'/user/login'}
                                                               className="theme-text-mainbrand">Zaloguj się</Link>.
                </p>
            </form>
        </div>
    </div>
}