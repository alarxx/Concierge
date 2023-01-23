import React, {useEffect} from 'react';

import {useLocation, useNavigate} from 'react-router-dom';
import {useAppContext} from "../../context/AppContext";

function log(...str){
    // console.log(...str);
}

export default function Login({}){
    const navigate = useNavigate();
    const location = useLocation();

    const {authHandler} = useAppContext();
    const {login} = authHandler;

    useEffect(()=>{
        log("Login location: ", location);
    }, [])

    function onSubmit(e){
        e.preventDefault();

        login({
            email: e.target.email.value,
            password: e.target.password.value,
        });

        if(location.state?.redirect){
            const state = {...location.state};
            log(`Redirect back to ${location.state.redirect} with state`, state);
            delete state.redirect;
            navigate(location.state.redirect, {replace: true, state});
        }
        else {
            navigate('/', {replace: true});
        }
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

            </form>
            <button onClick={
                e => {
                    const state = {...location.state}
                    log(`Navigate to /register/simple with state`, state);
                    navigate('/register/simple', {state, replace: true});
                }
            }>Sign up</button>
        </>
    );
}