import React, {useMemo, useState} from 'react';

import Box from "../../../shared/ui/box/Box";
import Card from "../../../shared/ui/card/Card";
import CardHeader from "../../../shared/ui/card/CardHeader";
import Logo from "../../../shared/ui/logo/Logo";
import CardBody from "../../../shared/ui/card/CardBody";
import NoNameForm from "../../../features/auth/no_name/NoNameForm";

export default function NoName({ }){


    return (<>
        <Box center={true}>
            <Card>
                <CardHeader>
                    <Logo />
                </CardHeader>

                <CardBody>
                    <NoNameForm />
                </CardBody>
            </Card>
        </Box>


    </>);
}