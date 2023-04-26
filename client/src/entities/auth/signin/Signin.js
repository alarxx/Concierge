import React, {useState, useEffect} from 'react';
import Input from '../../../shared/ui/input/Input';
import Button from '../../../shared/ui/button/Button';

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
        console.log('SUUUBBBMIT')

        const json = await signin({ email, password });
        // console.log({json})
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

    return (
        <div className="">
            {response && <p>{response.message}</p>}
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

