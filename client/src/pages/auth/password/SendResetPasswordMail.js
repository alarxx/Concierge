import React from 'react'
import {useNavigate} from "react-router-dom";

import SendResetPasswordMailForm from '../../../entities/reset_password/SendResetPasswordMail';

import Box from '../../../ui/box/Box'
import Card from '../../../ui/card/Card'
import CardHeader from '../../../ui/card/CardHeader'
import CardBody from '../../../ui/card/CardBody'
import CardFooter from '../../../ui/card/CardFooter'
import Logo from '../../../ui/logo/Logo'
import TextWithLink from '../../../ui/text_with_link/TextWithLink'

export default function SendResetPasswordMail(){

    const navigate = useNavigate();

    return (<>
        <Box>
            <Card>
                <CardHeader>
                    <Logo />
                </CardHeader>

                <CardBody>
                    <SendResetPasswordMailForm />
                </CardBody>
                
                <CardFooter>
                    <TextWithLink text="Уже есть аккаунт?" linktext="Авторизация" onClick={e => navigate('/authn', {replace:true})} />
                </CardFooter>
            </Card>
        </Box>
    </>);
}