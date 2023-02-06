import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {LoginView} from "./views/LoginView";
import {RegisterView} from "./views/RegisterView";
import {TermsView} from "./views/TermsView";
import {SingleTermView} from "./views/SingleTermView";
import {HomeView} from "./views/HomeView";
import {SampleTermbaseView} from "./views/SampleTermbaseView";
import {EditTermView} from "./views/EditTermView";
import {AddTermView} from "./views/AddTermView";
import {NotFoundView} from "./views/NotFoundView";
import {UserCockpitView} from "./views/UserCockpitView";

export const App = () => {
    return <>

        <Routes>
            <Route path="/"
                   element={<HomeView/>}/>
            <Route path="/user/login"
                   element={<LoginView/>}/>
            <Route path="/user/register"
                   element={<RegisterView/>}/>
            <Route path="/user/:userId"
                   element={<UserCockpitView/>}/>
            <Route path="/terms"
                   element={<TermsView/>}/>
            <Route path="/terms/:termId"
                   element={<SingleTermView/>}/>
            <Route path="/terms/add"
                   element={<AddTermView/>}/>
            <Route path="/terms/:termId/edit"
                   element={<EditTermView/>}/>
            <Route path="/termbases/sampletermbase"
                   element={<SampleTermbaseView/>}/>
            <Route path="*"
                   element={<NotFoundView/>}/>
        </Routes>
    </>
}