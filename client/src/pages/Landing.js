import React, { useEffect, useState } from 'react';


import Auth from '../components/auth/Auth'
import Navigation from '../widgets/navigation_panel/NavigationPanel';
import Card from '../ui/card/Card';
import CardHeader from '../ui/card/CardHeader';
import Logo from '../ui/logo/Logo';
import CardBody from '../ui/card/CardBody';
import CardFooter from '../ui/card/CardFooter';
import TextWithLink from '../ui/text_with_link/TextWithLink'
import SignIn from '../entities/signin/Signin';
import Signup from '../entities/signup/Signup';


export default function Main({}){

    const [isSignup, setIsSignup] = useState(false)

    // useEffect(()=> {
    //     if 
    // }, [isSignup])

    const handleClick = (isSignup) => {
        setIsSignup(isSignup);
    };

    return (
        <Card>
            <CardHeader>
                <Logo />
            </CardHeader>
            <CardBody>
                {isSignup ? <Signup /> : <SignIn /> }
                
            </CardBody>
            <CardFooter>
                {isSignup 
                    ? <TextWithLink text="Уже есть аккаунт?" linktext="Авторизация" onClick={() => handleClick(false)} />
                    : <TextWithLink text="Нет аккаунта?" linktext="Регистрация" onClick={() => handleClick(true)} />
                }
                
            </CardFooter>
        </Card>
    )
}