import React, {FormEvent, useContext, useEffect, useState} from "react";
import {CreateTermbaseReq} from "types";
import {useNavigate} from "react-router-dom";
import {LoginContext} from "../../contexts/login.context";

interface Props {
    onListChange: () => void;
}

export const AddTermbase = (props: Props) => {
    const [termbase, setTermbase] = useState<CreateTermbaseReq>({
        termbaseName: '',
        userName: '',
    });

    const [savedTermbase, setSavedTermbase] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const {loggedIn, userName} = useContext(LoginContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/user/login');
        }
    }, []);

    useEffect(() => {
        if (savedTermbase) {
            navigate(`/user/${userName}/termbases`);
        }
    }, [savedTermbase]);

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            await fetch(`http://localhost:3001/user/${userName}/termbases`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(termbase),
            });
            setSavedTermbase(true);
            props.onListChange();
        } finally {
            setLoading(false);
        }
    };

    const updateForm = (termbaseName: string) => {
        setTermbase((termbase: CreateTermbaseReq) => ({
            termbaseName,
            userName,
        }));
    };


    return <div className="theme-border-lightaccent pb-5">
        <form onSubmit={sendForm}
              className="col-12 col-md-10 col-lg-8">
            <div className="mb-3 row">
                <div className="col-12">
                    <label htmlFor="termbaseName"
                           className="form-label fw-bold">Nazwa słownika</label>
                </div>
                <div className="col-9">
                    <input
                        type="text"
                        value={termbase.termbaseName}
                        onChange={e => updateForm(e.target.value)}
                        minLength={3}
                        maxLength={50}
                        className="form-control"
                        id="termbaseName"
                        aria-describedby="termbaseNameHelp"
                        required
                    />
                    <div id="termbaseNameHelp"
                         className="form-text">Pole obowiązkowe. Nazwa słownika może mieć od 3 do 50 znaków. Może
                        składać się
                        z kilku wyrazów.
                    </div>
                </div>
                <div className="col-3">
                    <button type="submit"
                            className="btn theme-btn-mainbrand border-2 w-100"
                    >
                        Zapisz
                    </button>
                </div>

            </div>

        </form>
    </div>


}