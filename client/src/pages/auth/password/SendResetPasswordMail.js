import React from 'react'
import {useNavigate} from "react-router-dom";

import SendResetPasswordMailForm from '../../../features/reset_password/SendResetPasswordMail';

import Box from '../../../shared/ui/box/Box'
import Card from '../../../shared/ui/card/Card'
import CardHeader from '../../../shared/ui/card/CardHeader'
import CardBody from '../../../shared/ui/card/CardBody'
import CardFooter from '../../../shared/ui/card/CardFooter'
import Logo from '../../../shared/ui/logo/Logo'
import TextWithLink from '../../../shared/ui/text_with_link/TextWithLink'

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