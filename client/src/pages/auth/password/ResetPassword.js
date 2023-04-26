import React from 'react';

import ResetPasswordForm from '../../../features/reset_password/ResetPassword';

import Box from '../../../shared/ui/box/Box'
import Card from '../../../shared/ui/card/Card'
import CardHeader from '../../../shared/ui/card/CardHeader'
import CardBody from '../../../shared/ui/card/CardBody'
import CardFooter from '../../../shared/ui/card/CardFooter'
import Logo from '../../../shared/ui/logo/Logo'

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