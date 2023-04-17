import React, {useEffect, useMemo, useState} from 'react';

import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import useTimer from "../../../hooks/useTimer";
import Logger from "../../../internal/Logger";
import {useAppContext} from "../../../context/AppContext";

/**
 * SignIn должен работать также, как и OAuth Azure Ad перенаправлять на link и redirect-ить на /?authenticated=Boolean,
 * SignUp не должен перенаправлять, а только возвращать json о том, получилось ли создать нового пользователя или нет.
 * */
export default function SendResetPasswordMail(){

    const location = useLocation();
    const navigate = useNavigate();

    const { authHandler } = useAppContext();
    const { sendResetPasswordMail } = authHandler;

    const logger = useMemo(()=>new Logger('sendResetPasswordMail'), []);

    const [email, setEmail] = useState('');

    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {timer, startTimer} = useTimer(()=>{}, 60);

    async function onSubmit(e){
        e.preventDefault();

        setSuccess(null);
        setError(null);
        setLoading(true);

        sendResetPasswordMail({ email })
            .then(json => {
                logger.log(json);
                if(json.status === 200){
                    startTimer();
                    setSuccess(json);
                }
                else {
                    logger.error(json)
                    setError(json);
                }
            })
            .catch(e=>setError(e))
            .finally(()=>setLoading(false));
    }

    useEffect(()=>{
        if(!location.state) return;

        const { message, email } = location.state;
        if(!message || !email) return;

        setError({message});
        setEmail(email);

    }, []);

    return (<>
        <h1>[Send reset password e-mail]</h1>

        {success && <p>{success.message}</p>}
        {loading && <p>loading...</p>}
        {error && <p>{error.message}</p>}

        <form onSubmit={onSubmit}>
            <div>
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required />
            </div>

            <button type="submit">Send mail</button>
        </form>

        <button onClick={e => navigate('/authn', {replace:true})}>Sign in</button>

    </>);
}