import React from 'react'
import {useNavigate} from "react-router-dom";

import SendResetPasswordMailForm from '../../../features/auth/password_send_reset/SendResetPasswordMail';

import Box from '../../../shared/ui/box/Box'
import Card from '../../../shared/ui/card/Card'
import CardHeader from '../../../shared/ui/card/CardHeader'
import CardBody from '../../../shared/ui/card/CardBody'
import CardFooter from '../../../shared/ui/card/CardFooter'
import Logo from '../../../shared/ui/logo/Logo'
import TextWithLink from '../../../shared/ui/text_with_link/TextWithLink'
import Block from "../../../shared/ui/block/Block";
import Typography from "../../../shared/ui/typography/Typography";

export default function SendResetPasswordMail(){

    const navigate = useNavigate();

    return (<>
        <Box center={true}>
            <Block top={40} bottom={30}>
                <Logo />
            </Block>
            <Card>
                <CardHeader>
                    <Block isAlignCenter={true}>
                        <Typography weight={600} size={24} align={'center'}>Сброс пароля</Typography>
                    </Block>
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