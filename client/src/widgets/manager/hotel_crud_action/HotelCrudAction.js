import React, {useState} from "react";
import Button from "../../../shared/ui/button/Button";
import Modal from "../../../shared/ui/modal/Modal";
import HotelCrudForm from "../../../features/hotel/hotel_crud_form/HotelCrudForm";

export default function HotelCrudAction({item}) {

    const [isModalActive, setIsModalActive] = useState(false);
    function onClick() {
        setIsModalActive(true)
    }

    return(<>
        {isModalActive && <Modal minWidth={680} maxWidth={1100} onClose={e => setIsModalActive(false)}>
            <HotelCrudForm item={{item}} cancelClick={e => setIsModalActive(false)} />
        </Modal>}
        <Button onClick={onClick}>Добавить отель</Button>
    </>)
}