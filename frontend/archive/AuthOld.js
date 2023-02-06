import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAppContext} from "../src/context/AppContext";
import Header from "../src/pages/new/Header";
import MultistepForm from "../src/components/form/MultistepForm";
import WorkTypes from "../src/pages/auth/registerForms/WorkTypesForm";
import UserForm from "../src/pages/auth/registerForms/UserForm";
import PasswordsForm from "../src/pages/auth/registerForms/PasswordsForm";
import LoginForm from "../src/pages/auth/loginForms/LoginForm";

const registerForms = [WorkTypes, UserForm, PasswordsForm]
const loginForms = [LoginForm]

function log(...str){
    console.log(...str)
}

export default function AuthOld(){
    const location = useLocation();
    const navigate = useNavigate();

    const {authHandler} = useAppContext();
    const {login, register, userLoading } = authHandler;


    const [data, setData] = useState({})
    const [type, setType] = useState('login')

    function onSubmit(e){
        (async ()=>{

            const state = {...location.state};

            if(type === 'login'){
                const err = await login(data);
                if(err){
                    log("Login error", err);
                    navigate('/authenticate', {replace: true, state});
                }
                else{
                    log("Successful login redirect to", location.state?.redirect ? location.state.redirect : '/');

                    delete state.redirect;
                    // console.log("navigate to", location.state.redirect, "\nstate", state);
                    navigate(location.state?.redirect ? location.state.redirect : '/', {replace: true, state});
                }
            }
            else{
                const err = await register(data);
                if(err){
                    log("Registration error", err);
                    navigate('/authenticate', {replace: true, state});
                }
                else{
                    log("Successful registration redirect to login");
                    setType('login')
                    // console.log("navigate to /authenticate", "\nstate", state);
                    // navigate(location.state?.redirect ? location.state.redirect : '/', {replace: true, state});

                    navigate('/authenticate', {replace: true, state});
                }
            }

        })()
    }

    return (
        <>
            {userLoading && <p>loading...</p>}

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