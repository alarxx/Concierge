import React from 'react';

import ResetPasswordForm from '../../../entities/reset_password/ResetPassword';

import Box from '../../../ui/box/Box'
import Card from '../../../ui/card/Card'
import CardHeader from '../../../ui/card/CardHeader'
import CardBody from '../../../ui/card/CardBody'
import CardFooter from '../../../ui/card/CardFooter'
import Logo from '../../../ui/logo/Logo'

/**
 * Страница смены пароля.
 * */
export default function ResetPassword(){

    return (<>
        <Box>
            <Card>
                <CardHeader>
                    <Logo />
                </CardHeader>

                <CardBody>
                    <ResetPasswordForm />
                </CardBody>
            </Card>
        </Box>
    </>);
}