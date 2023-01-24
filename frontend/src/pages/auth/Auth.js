import React, {useEffect, useState} from 'react';

import WorkTypes from "./forms/WorkTypesForm";
import UserForm from "./forms/UserForm";
import PasswordsForm from "./forms/PasswordsForm";

import MultistepForm from "../../components/form/MultistepForm";
import {useLocation, useNavigate} from "react-router-dom";

const forms = [WorkTypes, UserForm, PasswordsForm]

export default function Auth() {
    const location = useLocation();
    const navigate = useNavigate();

    const [data, setData] = useState({})

    function onSubmit(data){
        console.log(data);

        // register(data);

        if(location.state?.redirect){
            const state = {...location.state};
            delete state.redirect;
            navigate(location.state.redirect, {replace: true, state});
        }
        else {
            navigate('/', {replace: true});
        }

    }

    return (
        <MultistepForm
            forms={forms}
            data={data}
            setData={setData}
            onSubmit={onSubmit}
            submitButtonName={"Создать аккаунт"}
        />
    );
}