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
    const [isTokenExpired, setIsTokenExpired] = useState(false);

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    function onActivateAccount(e){
        setSuccess(null);
        setError(null);
        setLoading(true);

        activation({ activation_token: token, name:`${firstname} ${lastname}`, phone:phone, password })
            .then(json => {
                logger.log(json)
                if(json.status >= 200 && json.status < 300){
                    // startTimer();
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
            setIsTokenExpired(true);
            setError({
                message: 'Validation Error',
                errors: [
                    { name: 'activation_token', message: 'Токен активации просрочен'},// 'The activation token has expired' }
                ]
            });
        }
    }, []);


    function navigate_authn(){
        window.location.replace(String(env.API_URL).endsWith('/') ?
            `${env.API_URL}authn` :
            `${env.API_URL}/authn`
        )
    }

    if(success){
        return (<>
            <h3>Активация аккаунта</h3>
            {success && <p>{success.message}.</p>}
            {/*{success && <p>{success.message}. This tab will automatically close after {timer} second{timer>=2?'s':''}</p>}*/}
            <Button onClick={navigate_authn}>Продолжить</Button>
        </>);
    }

    if(isTokenExpired){
        return (<>
            <h3>Активация аккаунта</h3>
            <p>Токен активации просрочен</p>
            <Button onClick={navigate_authn}>
                Авторизация
            </Button>
        </>);
    }

    return (<>
        <h3>Активация аккаунта</h3>

        {/*{success && <p>{success.message}. This tab will automatically close after {timer} second{timer>=2?'s':''}</p>}*/}

        {loading && <Loading />}
        {error && (error.errors?.length > 0 ? <p>
            {error.errors
                .map(err => {
                    if(err.message === 'Insecure password'){
                        return 'Пароль должен включать строковые символ, символы с большой буквы, цифры, специальные символы';
                    }
                    return err.message || err.phone; // Сори за err.phone lil shitcode, mongoose так выдает ошибки
                })
                .join(', ')}
        </p> : error.message)}

        {/* Если токен просрочен, то это показывать нельзя, простую проверку наличия error ставить нельзя, может выйти ошибка "слабый пароль" */}
        {token && (!loading && !success) && <form onSubmit={onActivateAccount}>
            <label>Имя</label>
            <Input
                type={'text'}
                name={'firstname'}
                value={firstname}
                placeHolder='Введите имя'
                onChange={e=>setFirstname(e.target.value)}
                required
            />

            <br/>

            <label>Фамилия</label>
            <Input
                type={'text'}
                name={'lastname'}
                value={lastname}
                placeHolder='Введите фамилию'
                onChange={e=>setLastname(e.target.value)}
                required
            /> {/*required*/}
            <br/>

            <label>Номер телефона</label>
            <Input
                type={'number'}
                name={'phone'}
                value={phone}
                placeHolder='Введите номер телефона'
                onChange={e=>setPhone(e.target.value)}
                required
            /> {/*required*/}
            <br/>

            <label>Пароль</label>
            <Input
                type={'password'}
                name={'password'}
                value={password}
                placeHolder='Введите пароль'
                onChange={e=>setPassword(e.target.value)}
                required
            />

            <Button type="submit">Создать аккаунт</Button>
        </form>}

    </>);
}