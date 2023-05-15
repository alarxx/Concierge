import React, {useState} from "react";

import Button from "../../shared/ui/button/Button";
import Modal from "../../shared/ui/modal/Modal";
import LogoutForm from "../../features/auth/logout/LogoutForm";
import useToggle from "../../hooks/useToggle";

export default function LogoutAction({inverseColor}) {


    const [isActive, toggle] = useToggle(false);

    return(<>
        {isActive && <LogoutForm onClose={toggle}/>}
        <Button variant={inverseColor ? 'outline-inverse' : 'outline'} onClick={toggle}>Выйти из аккаунта</Button>
    </>)
}