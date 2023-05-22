import React from 'react';

import ResetPasswordForm from '../../../features/auth/password_reset/ResetPassword';

import Box from '../../../shared/ui/box/Box'
import Card from '../../../shared/ui/card/Card'
import CardHeader from '../../../shared/ui/card/CardHeader'
import CardBody from '../../../shared/ui/card/CardBody'
import CardFooter from '../../../shared/ui/card/CardFooter'
import Logo from '../../../shared/ui/logo/Logo'
import Typography from "../../../shared/ui/typography/Typography";
import Block from "../../../shared/ui/block/Block";

/**
 * Страница смены пароля.
 * */
export default function ResetPassword(){

    return (<>
        <Box center={true}>
            <Block top={40} bottom={30}>
                <Logo />
            </Block>
            <Card>
                <CardHeader>
                    <Block isAlignCenter={true}>
                        <Typography weight={600} size={24} align={'center'}>Смена пароля</Typography>
                    </Block>
                </CardHeader>

                <CardBody>
                    <ResetPasswordForm />
                </CardBody>
            </Card>
        </Box>
    </>);
}