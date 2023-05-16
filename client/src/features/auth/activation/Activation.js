import React, {useEffect, useMemo, useState} from 'react';

import {useLocation, useNavigate} from 'react-router-dom';
import {isExpired} from 'react-jwt';
import {useAppContext} from '../../../context/AppContext';

import Logger from '../../../internal/Logger';
import useTimer from "../../../hooks/useTimer";

import Input from '../../../shared/ui/input/Input';
import Button from '../../../shared/ui/button/Button';
import Loading from "../../../shared/loading/Loading";

import env from '../../../../.env.json';

/**
 * Страница активации аккаунта.
 *
 * Контекст наблюдает за этой страницей, здесь пользователь всегда не аутентифицирован.
 *
 * Если в контексте не передан токен активации или если он не пришел на почту,
 * то мы дожидаемся аутентификации/загрузки-whoami пользователя и запрашиваем новый e-mail.
 *
 * Если e-mail со ссылкой пришел на почту, то мы переходим по ссылке,
 * нас перенаправляет на /authn/activation с токеном в контексте и сразу отключаем socket,
 * потому что иначе нас может здесь перенаправить на прошлую страницу, что убьет флоу.
 *
 * */
export default function Activation(){

    const location = useLocation();
    const navigate = useNavigate();

    const logger = useMemo(()=>new Logger('Activation'),[])

    const { authHandler } = useAppContext();
    const { activation } = authHandler;

    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {timer, startTimer} = useTimer(()=>window.location.replace(env.API_URL), 5);

    const [token] = useState(location.state?.activation_token);
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    function onActivateAccount(e){
        setSuccess(null);
        setError(null);
        setLoading(true);

        activation({ activation_token: token, name, password })
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
        logger.log("state.activation_token", token);
        if(!token){ // Нужно эту проверку сделать в useAuth
            return navigate('/');
        }
        /*
        * Можно не проверять здесь токен на самом деле.
        * Сервер все равно не примет запрос с просроченным токеном.
        * */
        const expired = isExpired(token);
        if(expired){
            setError(new Error('The activation token has expired'));
        }
    }, []);


    if(success){
        return (<>
            <h1>Activation</h1>

            {success && <p>{success.message}.</p>}
            <Button onClick={e => window.history.replace(env.API_URL)}>Продолжить</Button>
        </>);
    }

    return (<>
        <h1>Активация аккаунта</h1>

        {/*{success && <p>{success.message}. This tab will automatically close after {timer} second{timer>=2?'s':''}</p>}*/}

        {loading && <Loading />}
        {error && <p>{JSON.stringify(error.errors)}</p>}

        {/* Если токен просрочен, то это показывать нельзя, простую проверку наличия error ставить нельзя, может выйти ошибка "слабый пароль" */}
        {token && (!loading && !success) && <form onSubmit={onActivateAccount}>
            <label>Name</label>
            <Input
                type={'text'}
                name={'name'}
                value={name}
                placeHolder='Введите имя'
                onChange={e=>setName(e.target.value)}
            /> {/*required*/}
            <br/>

            <label>Password</label>
            <Input
                type={'password'}
                name={'password'}
                value={password}
                placeHolder='Введите пароль'
                onChange={e=>setPassword(e.target.value)}
                required
            />

            <Button type="submit">Активировать аккаунт</Button>
        </form>}

    </>);
}