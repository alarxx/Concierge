import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useAppContext} from "../../src/context/AppContext";

function log(...str){
    // console.log(...str);
}

export default function RegisterSimple({}){
    const navigate = useNavigate();
    const location = useLocation();

    const {authHandler} = useAppContext();
    const {register} = authHandler;

    useEffect(()=>{
        log("Register location: ", location);
    }, [])

    function onSubmit(e){
        e.preventDefault();

        register({
            email: e.target.email.value,
            name: e.target.name.value,
            password: e.target.password.value,
        });

        const state = {...location.state}
        log(`Registered. Navigate to /login with state`, state);
        navigate('/login', {state, replace: true});
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
            <button onClick={
                e => {
                    const state = {...location.state}
                    log(`Navigate to /login with state`, state);
                    navigate('/login', {state, replace: true});
                }
            }> Login </button>
        </>
    );
}