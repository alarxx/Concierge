import React from 'react';

import ActivationForm from '../../../features/auth/activation/Activation';

import Box from '../../../shared/ui/box/Box'
import Card from '../../../shared/ui/card/Card'
import CardHeader from '../../../shared/ui/card/CardHeader'
import CardBody from '../../../shared/ui/card/CardBody'
import CardFooter from '../../../shared/ui/card/CardFooter'
import Logo from '../../../shared/ui/logo/Logo'
/**
 * Страница активации аккаунта.
 *
 * Контекст наблюдает за этой страницей, здесь пользователь всегда не аутентифицирован.
 *
 * Если в контексте не передан токен активации или если он не пришел на почту,
 * то мы дожидаемся аутентификации/загрузки-whoami пользователя и запрашиваем новый e-mail.
 *
 * Если e-mail со ссылкой пришел на почту, то мы переходим по ссылке,
 * нас перенаправляет на /authn/activation с токеном в контексте и сразу отключаем socket,
 * потому что иначе нас может здесь перенаправить на прошлую страницу, что убьет флоу.
 *
 * */
export default function Activation(){

    return (
        <Box center={true}>
            <Card>
                <CardHeader>
                    <Logo />
                </CardHeader>

                <CardBody>
                    <ActivationForm />
                </CardBody>
            </Card>
        </Box>
    );
}