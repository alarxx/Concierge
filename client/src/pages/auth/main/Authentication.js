import React, {useEffect, useMemo, useState} from 'react';
import {Link, Navigate, NavLink, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useAppContext} from "../../../context/AppContext";

import Logger from '../../../internal/Logger';
import SignIn from "./SignIn";
import SendActivationMail from "./SendActivationMail";
import SendResetPasswordMail from "../password/SendResetPasswordMail";

/*
* 1) Не всегда при OAuth2 имеется имя, а в приложении хотелось бы иметь имя всегда.
* Для этого нужно, если нет имени пользователя, перенаправлять на страницу
* */
/**
 * type: [signin, sendActivationMail]
 * */
export default function Authentication({ }){

    const navigate = useNavigate();

    const { authHandler } = useAppContext();
    const { userLoading, signin, sendActivationMail } = authHandler;

    const logger = useMemo(()=>new Logger('Authentication'), []);

    const [type, setType] = useState('signin');

    // SignUp/SignIn должны быть в одном компоненте и OAuth тоже, все должно быть в одном Authentication page
    return (<>
        <h1>[Authenticate]</h1>

        {userLoading && <p>loading...</p>}


        {type === 'signin' &&
            <SignIn signin={signin}/>
        }
        {type === 'sendActivationMail' &&
            <SendActivationMail sendActivationMail={sendActivationMail} />
        }


        {type==='sendActivationMail' &&
            <button onClick={e => setType('signin')}>already have an account?</button>
        }
        {type==='signin' &&
            <button onClick={e => setType('sendActivationMail')}>don't have an account yet?</button>
        }
        <br/><br/>


        <button onClick={e => navigate('/authn/send-reset', {replace:true})}>Forgot Password?</button>
        <br/><br/>


        <a href={"/auth/azure"}><button>OpenID Connect</button></a>

    </>);
}

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/