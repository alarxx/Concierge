import React from 'react';

export default function Register(props){
    return (
        <>
            <h1>Register Page</h1>
            <form action="/auth/register" method="POST">
                <div>
                    <label htmlFor="InputName">Name</label>
                    <input type="text" id="InputName" name="name"/>
                </div>

                <div>
                    <label htmlFor="InputEmail">Email</label>
                    <input type="text" id="InputEmail" name="email"/>
                </div>

                <div>
                    <label htmlFor="InputPassword">Password</label>
                    <input type="text" id="InputPassword" name="password"/>
                </div>

                <br/>
                <button type="submit" className="btn btn-primary">Submit</button>

                <br/>
                <button><a href="/auth/login">Sign in</a></button>

            </form>

        </>
    );
}