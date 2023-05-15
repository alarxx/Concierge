import React, {useState} from "react";
import Button from "../../../shared/ui/button/Button";
import Modal from "../../../shared/ui/modal/Modal";
import HotelCrudForm from "../../../features/hotel/hotel_crud_form/HotelCrudForm";
import useHotelCrudAction from "./useHotelCrudAction";
import ConciergeServiceForm from "../../../features/order/concierge_service_form/ConciergeServiceForm";
import useToggle from "../../../hooks/useToggle";

export default function HotelCrudAction({item}) {

    const [isActive, toggle] = useToggle(false);

    return(<>
        { isActive && <HotelCrudForm title={'Добавление отеля'} item={item} onClose={toggle}/> }

        <Button onClick={toggle}>Добавить отель</Button>
    </>)
}