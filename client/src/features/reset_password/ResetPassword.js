import React, {useEffect, useMemo, useState} from 'react';

import {useLocation, useNavigate} from "react-router-dom";
import {isExpired} from "react-jwt";
import {useAppContext} from "../../context/AppContext";

import Logger from '../../internal/Logger';
import useTimer from "../../hooks/useTimer";


import Input from '../../shared/ui/input/Input'
import Button from '../../shared/ui/button/Button'
/**
 * Страница смены пароля.
 * */
export default function ResetPassword(){

    const location = useLocation();
    const navigate = useNavigate();

    const logger = useMemo(()=>new Logger('ResetPassword'),[])

    const { authHandler } = useAppContext();
    const { resetPassword } = authHandler;

    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {timer, startTimer} = useTimer(()=>window.close(), 5);

    const [token] = useState(location.state?.reset_password_token);
    const [password, setPassword] = useState('')

    function onSubmit(e){
        setSuccess(null);
        setError(null);
        setLoading(true);

        resetPassword({ reset_password_token: token, password })
            .then(json => {
                logger.log(json)
                if(json.status >= 200 && json.status < 300){
                    startTimer();
                    setSuccess(json);
                }
                else {
                    setError(json);
                }
            })
            .catch(e=>setError(e))
            .finally(()=>setLoading(false));

    }

    useEffect(()=>{
        logger.log("state.reset_password_token", token);
        if(!token){ // Нужно эту проверку сделать в useAuth
            return navigate('/');
        }
        /*
        * Можно не проверять здесь токен на самом деле.
        * Сервер все равно не примет запрос с просроченным токеном.
        * */
        const expired = isExpired(token);
        if(expired){
            setError(new Error('The reset password token has expired'));
        }
    }, []);


    return (<>
        <h1>[Change Password Page]</h1>

        {success && <p>{success.message}. This tab will automatically close after {timer} second{timer>=2?'s':''}</p>}

        {loading && <p>loading...</p>}
        {error && <p>{error.message}</p>}

        {token && (!loading && !success) && <form onSubmit={onSubmit}>

            <label>Password</label>
            <Input 
                type={'password'} 
                name={'password'} 
                value={password}
                placeHolder='Введите новый пароль' 
                onChange={e=>setPassword(e.target.value)} 
                required 
            />

            <Button type='submit'>Установить новый пароль</Button>
        </form>}

    </>);
}