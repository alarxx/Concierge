import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
export default function Login({auth}){
    const navigate = useNavigate();

    const onSubmit = e => {
        e.preventDefault();
        auth.login({
            email: e.target.email.value,
            password: e.target.password.value,
        });
        navigate('/', {replace: true});
    }

    return (
        <>
            <h1>Login Page</h1>
            <form onSubmit={onSubmit} action="/auth/Login" method="POST">
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
                <button><a href="/auth/Register">Sign Up</a></button>
            </form>
        </>
    );
}