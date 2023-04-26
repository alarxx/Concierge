import React, { Fragment, useEffect, useState } from 'react';

import Button from '../ui/button/Button'

export default function Landing({}){
    
    const navigate = useNavigate();

    return (
        <Fragment>
            <Button onClick={e => navigate('/authn', {replace: true})} >Войти в систему</Button>
        </Fragment>
    )
}