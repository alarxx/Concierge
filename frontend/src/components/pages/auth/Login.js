import React from 'react';

export default function Login(props){
    return (
        <>
            <h1>Login Page</h1>
            <form action="/auth/Login" method="POST">
                <div>
                    <label htmlFor="InputEmail">Email</label>
                    <input type="text" id="InputEmail" name="email" />
                </div>

                <div>
                    <label htmlFor="InputEmail">Password</label>
                    <input type="text" id="InputPassword" name="password" />
                </div>

                <br/>
                <button type="submit" className="btn btn-primary">Submit</button>

                <br/>
                <button><a href="/auth/Register">Sign up</a></button>
            </form>
        </>
    );
}