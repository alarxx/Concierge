import React, {useState} from "react";
import Button from "../../../shared/ui/button/Button";
import Modal from "../../../shared/ui/modal/Modal";
import HotelCrudForm from "../../../features/hotel/hotel_crud_form/HotelCrudForm";
import useHotelCrudAction from "./useHotelCrudAction";

export default function HotelCrudAction({item}) {

    const {openModal} = useHotelCrudAction(item);

    return(<>
        <Button onClick={e => openModal(true)}>Добавить отель</Button>
    </>)
}