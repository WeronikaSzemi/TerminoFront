import React from "react";

export const ContactForm = () => {
    return <div className="container p-5">
        <div id="contact">
            <h2 className="theme-text-dark text-center mb-4">Kontakt</h2>
            <form action="termino/src/components">                {/* @TODO handle form */}
                <div className="row align-items-center">
                    <div className="col-md-7 mb-3">
                        <label htmlFor="subject"
                               className="form-label">Temat</label>
                        <input type="text"
                               className="form-control"
                               id="subject"
                               placeholder="Np. Problemy z logowaniem"
                               required
                        />
                        <label htmlFor="body"
                               className="form-label mt-3">Treść wiadomości</label>
                        <textarea name="body"
                                  id="body"
                                  className="form-control"
                                  required/>
                    </div>
                    <div className="col-md-5 mb-3 text-center">
                        <div className="card">
                            <div className="card-header theme-bg-darkaccent">
                                <h3 className="fs-6 theme-text-light mb-0">Napisz do nas</h3>
                            </div>
                            <div className="card-body theme-bg-light p3">
                                <p>Zazwyczaj odpowiadamy w ciągu dwóch dni roboczych</p>
                                <button className="btn theme-btn-mainbrand">Wyślij</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
}