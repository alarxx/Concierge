import React, {useEffect, useState} from 'react';

import {useAppContext} from "../../../context/AppContext";
import {useNavigate} from "react-router-dom";

/**
 * SignIn должен работать также, как и OAuth Azure Ad перенаправлять на link и redirect-ить на /?authenticated=Boolean,
 * SignUp не должен перенаправлять, а только возвращать json о том, получилось ли создать нового пользователя или нет.
 * */
export default function SignIn({ signin=f=>f }){
    const navigate = useNavigate();

    const [response, setResponse] = useState(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function onSubmit(e){
        e.preventDefault();

        const json = await signin({ email, password });

        setResponse(json);
    }

    useEffect(()=>{
        if(response){
            setResponse(null);
        }
    }, [email, password])

    useEffect(()=>{
        // Эту проверку response лучше занести в функцию signin
        if(response?.status === 409 && response?.errors[0].identity_provider_mismatch){
            navigate('/authn/send-reset', {
                state: {
                    message: response.message,
                    email: email
                }
            });
        }
    }, [response])


    return (<>
        <h1>[Sign in]</h1>

        {response && <p>{response.message}</p>}

        <form onSubmit={onSubmit}>
            <div>
                <label>Email</label>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="text"
                    name="email"
                    required
                />
            </div>

            <div>
                <label>Password</label>
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="text"
                    name="password"
                    required
                />
            </div>

            <button type="submit">Sign in</button>
        </form>

    </>);
}