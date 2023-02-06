import React, {FormEvent, useEffect, useState} from "react";
import {newUser} from "types";
import {Spinner} from "../Spinner/Spinner";
import {LoginView} from "../../views/LoginView";


export const AddUser = () => {
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
    const [backgroundColor, setBackgroundColor] = useState<string>('');

    useEffect(() => {
        verifyPassword();
    }, [user]);

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

        await fetch('http://localhost:3001/user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        await setLoading(false);

        return <LoginView/>
    };

    return <div className="container p-3">
        <h2 className="mb-4">Rejestracja</h2>
        <form onSubmit={sendForm}>
            <div className="mb-3">
                <label htmlFor="userName"
                       className="form-label">Nazwa użytkownika_czki</label>
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
                       className="form-label">Hasło</label>
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
                       className="form-label">Powtórz hasło</label>
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
                     className="form-text">Pole obowiązkowe. Hasło może składać się z od 5 do 15 znaków.
                </div>
            </div>
            <button type="submit"
                    className="btn theme-btn-mainbrand border-2"
                    disabled={verificationResult.submitDisabled}
            >Utwórz konto
            </button>
        </form>
    </div>
}