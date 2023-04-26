import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {Link, Navigate, NavLink, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useAppContext} from "../../../context/AppContext";

import Logger from '../../../internal/Logger';
import SendActivationMail from "../../../entities/auth/signup/SendActivationMail";
import SendResetPasswordMail from "../password/SendResetPasswordMail";


import Card from '../../../ui/card/Card';
import CardHeader from '../../../ui/card/CardHeader';
import Logo from '../../../ui/logo/Logo';
import CardBody from '../../../ui/card/CardBody';
import CardFooter from '../../../ui/card/CardFooter';
import TextWithLink from '../../../ui/text_with_link/TextWithLink'
import SignIn from '../../../entities/auth/signin/Signin';
import Signup from '../../../entities/auth/signup/Signup';
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
    const { signin, sendActivationMail } = authHandler;

    const logger = useMemo(()=>new Logger('Authentication'), []);

    const [tabType, setTabType] = useState('signin');

    // SignUp/SignIn должны быть в одном компоненте и OAuth тоже, все должно быть в одном Authentication page
    return (
        <Fragment>

            <Card>
                <CardHeader>
                    <Logo />
                </CardHeader>

                <CardBody>
                    {tabType === 'signup' && <SendActivationMail sendActivationMail={sendActivationMail} />}
                    {tabType === 'signin' && <SignIn signin={signin} />}
                </CardBody>
                
                <CardFooter>
                    {tabType === 'signup' && <TextWithLink text="Уже есть аккаунт?" linktext="Авторизация" onClick={() => setTabType('signin')} />}
                    {tabType === 'signin' && <TextWithLink text="Нет аккаунта?" linktext="Регистрация" onClick={() => setTabType('signup')} />}
                </CardFooter>
            </Card>

            <button onClick={e => navigate('/authn/send-reset', {replace: true})}>Forgot Password?</button>
            <br/><br/>

            <a href={"/auth/azure"}><button>OpenID Connect</button></a>

        </Fragment>
    );
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