import React from 'react';


import Auth from '../components/auth/Auth'
import Navigation from '../widgets/navigation_panel/NavigationPanel';
import Card from '../ui/card/Card';
import CardHeader from '../ui/card/CardHeader';
import Logo from '../ui/logo/Logo';
import CardBody from '../ui/card/CardBody';
import CardFooter from '../ui/card/CardFooter';
import TextWithLink from '../ui/text_with_link/TextWithLink'
import SignIn from '../entities/signin/Signin';


export default function Main({}){

    return (
        <Card>
            <CardHeader>
                <Logo />
            </CardHeader>
            <CardBody>
                <SignIn />
            </CardBody>
            <CardFooter>
                <TextWithLink text="Нет аккаунта?" linktext="Регистрация" link="" />
            </CardFooter>
        </Card>
    )
}