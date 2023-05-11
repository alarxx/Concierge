import React, {useState} from "react";
import Button from "../../../shared/ui/button/Button";
import Modal from "../../../shared/ui/modal/Modal";
import ConciergeServiceForm from "../../../features/order/concierge_service_form/ConciergeServiceForm";

export default function ConciergeAction() {

    const [isModalActive, setIsModalActive] = useState(false);
    function onClick() {
        console.log('concierge service click')
        setIsModalActive(true)
    }

    return(<>
        {isModalActive && <Modal minWidth={360} maxWidth={400} onClose={e => setIsModalActive(false)}>
            <ConciergeServiceForm cancelClick={e => setIsModalActive(false)} />
        </Modal>}
        <Button variant={'outline'} onClick={onClick}>Оставить на усмотрение менеджеру</Button>
    </>)
}