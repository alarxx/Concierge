import React, {useState} from "react";

import Button from "../../shared/ui/button/Button";
import Modal from "../../shared/ui/modal/Modal";
import LogoutForm from "../../features/auth/logout/LogoutForm";

export default function LogoutAction() {

    const [isModalActive, setIsModalActive] = useState(false);
    function onClick() {
        setIsModalActive(true)
    }

    return(<>
        {isModalActive && <Modal minWidth={360} maxWidth={400} onClose={e => setIsModalActive(false)}>
            <LogoutForm cancelClick={e => setIsModalActive(false)} />
        </Modal>}
        <Button variant={'outline'} onClick={onClick}>Выйти из аккаунта</Button>
    </>)
}