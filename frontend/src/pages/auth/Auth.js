import React, {useEffect, useState} from 'react';

import WorkTypes from "./registerForms/WorkTypesForm";
import UserForm from "./registerForms/UserForm";
import PasswordsForm from "./registerForms/PasswordsForm";
import LoginForm from "./loginForms/LoginForm";

import MultistepForm from "../../components/form/MultistepForm";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";

const registerForms = [WorkTypes, UserForm, PasswordsForm]
const loginForms = [LoginForm]

export default function Auth() {
    const location = useLocation();
    const navigate = useNavigate();

    const {authHandler} = useAppContext();
    const {login, register} = authHandler;


    const [data, setData] = useState({})
    const [type, setType] = useState('login')

    function onSubmit(e){
        if(type==='login'){
            console.log("login", data);
            login(data);
        }else{
            console.log("register", data);
            register(data);
        }

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
        <>
            <div>
                <button onClick={e=>setType('login')}>Login</button>
                <button onClick={e=>setType('register')}>Register</button>
            </div>
            {type === 'login' &&
                <MultistepForm
                    forms={loginForms}
                    data={data}
                    setData={setData}
                    onSubmit={onSubmit}
                    submitButtonName={"Войти"}
                />
            }
            {type === 'register' &&
                <MultistepForm
                    forms={registerForms}
                    data={data}
                    setData={setData}
                    onSubmit={onSubmit}
                    submitButtonName={"Создать аккаунт"}
                />
            }

        </>
    );
}