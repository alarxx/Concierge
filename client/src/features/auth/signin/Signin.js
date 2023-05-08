import React, {useState, useEffect, useMemo} from 'react';
import Input from '../../../shared/ui/input/Input';
import Button from '../../../shared/ui/button/Button';

import {useAppContext} from "../../../context/AppContext";
import {useNavigate} from "react-router-dom";
import Logger from "../../../internal/Logger";
import Alert from "../../../shared/ui/alert/Alert";

/**
 * SignIn должен работать также, как и OAuth Azure Ad перенаправлять на link и redirect-ить на /?authenticated=Boolean,
 * SignUp не должен перенаправлять, а только возвращать json о том, получилось ли создать нового пользователя или нет.
 * */
export default function SignIn({ }){
    const logger = useMemo(()=>new Logger('Authentication'), []);

    const navigate = useNavigate();

    const { authHandler } = useAppContext();
    const { signin } = authHandler;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function onSubmit(e){
        e.preventDefault();
        logger.log('submit:', { email, password });

        setResponse(null);
        setError(null);
        setLoading(true);

        signin({ email, password })
            .then((json) => {
                logger.log(json);

                if(!json) {
                    return;
                }

                if(json.status < 200 || json.status >= 300){
                    setError(json);
                }
                else {
                    // json null при успешном входе, клиента перенаправляет
                    setResponse(json);
                }
            })
            .catch((e) => setError(e))
            .finally(() => setLoading(false));
    }

    useEffect(()=>{
        if(!error){
            return;
        }

        // Эту проверку error лучше занести в функцию signin? Хотя это ухудшит понимание кода
        if(error.status === 409 && error.errors.some(err => Boolean(err.identity_provider_mismatch))){
            navigate('/authn/send-reset', {
                state: {
                    message: error.message,
                    email: email
                }
            });
        }

    }, [error])

    return (
        <div className="">
            {loading && <Alert><p>loading...</p></Alert>}
            {error && <p>{error.message}</p>}

            <form onSubmit={onSubmit}>
                <Input 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    name="email"
                    placeHolder='Эл. почта' 
                    type='email' 
                    required
                />
                <Input 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    name="password"
                    placeHolder='Пароль' 
                    type='password' 
                    required
                />
                <Button type='submit'>Вход</Button>
            </form>
        </div>
    );
}

