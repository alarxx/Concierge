import React, {useEffect, useMemo, useState} from 'react';

import useTimer from "../../../hooks/useTimer";
import Logger from "../../../internal/Logger";

import Input from '../../../shared/ui/input/Input';
import Button from '../../../shared/ui/button/Button'
import {useAppContext} from "../../../context/AppContext";
import Loading from "../../../shared/loading/Loading";
import {useNavigate} from "react-router-dom";

/**
 * SignIn должен работать также, как и OAuth Azure Ad перенаправлять на link и redirect-ить на /?authenticated=Boolean,
 * SignUp не должен перенаправлять, а только возвращать json о том, получилось ли создать нового пользователя или нет.
 * */
export default function SendActivationMail({ }){

    const logger = useMemo(()=>new Logger('SendActivationMail'), []);

    const navigate = useNavigate();

    const { authHandler } = useAppContext();
    const { sendActivationMail } = authHandler;

    const [email, setEmail] = useState('');

    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {timer, startTimer, resetTimer, stopTimer} = useTimer(()=>{}, 60);

    useEffect(()=>{
        if(timer === 0){
            resetTimer();
            stopTimer();
            setSuccess(null);
            setError(null);
        }
    }, [timer])

    async function onSubmit(e){
        e.preventDefault();

        setSuccess(null);
        setError(null);
        setLoading(true);

        sendActivationMail({ email })
            .then(json => {
                logger.log(json);
                if(json.status === 200){
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

    return (<>
        <h3>Отправить письмо активации</h3>

        {loading && <Loading />}
        {success && <><p>Письмо успешно отправлено.{/*{success.message}*/}</p></>}
        {error && <p>{error.message}</p>}

        {success && <p>Мы можем отправить письмо снова {timer > 0 ? `через ${timer} секунд`:''}</p>}

        <form onSubmit={onSubmit}>
            <div>
                <label>Email</label>
                <Input
                    type="text"
                    name="email"
                    value={email}
                    placeHolder='Введите email'
                    onChange={e => setEmail(e.target.value)}
                    required 
                />
            </div>

            {!success && !error && <Button type="submit">Отправить</Button>}
        </form>
    </>);
}