import React, {useState} from "react";
import Button from "../../../shared/ui/button/Button";
import ConciergeServiceForm from "../../../features/order/concierge_service_form/ConciergeServiceForm";
import useToggle from "../../../hooks/useToggle";

export default function ConciergeAction() {


    const [isActive, toggle] = useToggle(false);

    return(<>
        { isActive && <ConciergeServiceForm onClose={toggle}/> }

        <Button variant={'outline'} onClick={toggle}>Оставить на усмотрение менеджеру</Button>
    </>)
}