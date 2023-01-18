import React from 'react';

import { useNavigate } from 'react-router-dom';
import {useAppContext} from "../../components/context/AppContext";

export default function Login(){
    const navigate = useNavigate();

    const {authHandler} = useAppContext();
    const {login} = authHandler;

    const onSubmit = e => {
        e.preventDefault();
        login({
            email: e.target.email.value,
            password: e.target.password.value,
        });
        navigate('/', {replace: true});
    }

    return (
        <>
            <h1>Login Page</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="InputEmail">Email</label>
                    <input type="text" id="InputEmail" name="email" />
                </div>

                <div>
                    <label htmlFor="InputEmail">Password</label>
                    <input type="text" id="InputPassword" name="password" />
                </div>

                <br/>
                <button type="submit" className="btn btn-primary">Sign In</button>

                <br/>
                <button><a href="/frontend/arch/RegisterSimple.js">Sign Up</a></button>
            </form>
        </>
    );
}