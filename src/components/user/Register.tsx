import React, {FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Spinner} from "../Spinner/Spinner";
import {newUser} from "types";

export const Register = () => {
    const [user, setUser] = useState<newUser>({
        userName: '',
        password: '',
        repeatPassword: '',
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [verificationResult, setVerificationResult] = useState({
        submitDisabled: true,
        backgroundColor: '',
    });
    const [userRegistered, setUserRegistered] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        verifyPassword();
    }, [user]);

    useEffect(() => {
        if (userRegistered) {
            navigate('/user/login');
        }
    }, [userRegistered]);

    const verifyPassword = () => {
        if (user.password !== user.repeatPassword) {
            setVerificationResult({
                submitDisabled: true,
                backgroundColor: 'lightcoral',
            });
        } else {
            setVerificationResult({
                submitDisabled: false,
                backgroundColor: '',
            });
        }
    }

    const updateForm = (key: string, value: any) => {
        setUser(user => ({
            ...user,
            [key]: value,
        }));
    };

    if (loading) {
        return <Spinner/>
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
                        aria-describedby="userNameHelp"
                        required
                    />
                <div id="userNameHelp"
                     className="form-text">Pole obowiązkowe. Nazwa użytkownika_czki może mieć od 5 do 30 znaków.
                </div>
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
                    style={{backgroundColor: verificationResult.backgroundColor}}
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
                    style={{backgroundColor: verificationResult.backgroundColor}}
                    aria-describedby="repeatPasswordHelp"
                    required
                />
                <div id="repeatPasswordHelp"
                     className="form-text">Pole obowiązkowe. W obu polach hasło musi być identyczne.
                </div>
            </div>
                <button type="submit"
                        className="btn theme-btn-mainbrand border-2 w-100"
                        disabled={verificationResult.submitDisabled}
                >Utwórz konto
                </button>
            </form>
        </div>
    </div>
}