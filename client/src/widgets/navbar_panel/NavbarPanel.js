import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import Navbar from '../../shared/ui/navbar/Navbar';
import NavbarLeft from '../../shared/ui/navbar/NavbarLeft';
import NavbarRight from '../../shared/ui/navbar/NavbarRight';
import NavbarCenter from '../../shared/ui/navbar/NavbarCenter';

export default function NavbarPanel({IconLeft, IconRight, title=''}){


    return (
        <Navbar>
            <NavbarLeft Icon={IconLeft} onClick={f=>f} />
            <NavbarCenter title={title} subtitle=''/> 
            <NavbarRight Icon={IconRight} onClick={f=>f} />
        </Navbar>
            
    );
}

