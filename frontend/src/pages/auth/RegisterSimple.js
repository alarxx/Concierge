import React from 'react';
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";

export default function RegisterSimple({auth}){
    const navigate = useNavigate();

    const {authHandler} = useAppContext();
    const {register} = authHandler;

    const onSubmit = e => {
        e.preventDefault();
        register({
            email: e.target.email.value,
            name: e.target.name.value,
            password: e.target.password.value,
        });
        navigate('/', {replace: true});
    }


    return (
        <>
            <h1>RegisterSimple Page</h1>
            <form onSubmit={onSubmit}>
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
            </form>

        </>
    );
}