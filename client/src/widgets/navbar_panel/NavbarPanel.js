import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import Navbar from '../../shared/ui/navbar/Navbar';
import NavbarLeft from '../../shared/ui/navbar/NavbarLeft';
import NavbarRight from '../../shared/ui/navbar/NavbarRight';
import NavbarCenter from '../../shared/ui/navbar/NavbarCenter';

export default function NavbarPanel({LeftButton, RightButton, title=''}){


    return (
        <Navbar>
            {LeftButton}
            <NavbarCenter title={title} subtitle=''/>
            {RightButton}
        </Navbar>
            
    );
}

