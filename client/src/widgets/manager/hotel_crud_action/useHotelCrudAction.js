import React, {useState} from "react";
import Button from "../../../shared/ui/button/Button";
import Modal from "../../../shared/ui/modal/Modal";
import HotelCrudForm from "../../../features/hotel/hotel_crud_form/HotelCrudForm";

export default function useHotelCrudAction({hotel}) {

    function openModal(flag=false) {
        const [isModalActive, setIsModalActive] = useState(flag);

        return (<>
                {isModalActive && <Modal minWidth={680} maxWidth={1100} onClose={e => setIsModalActive(false)}>
                    <HotelCrudForm item={hotel} cancelClick={e => setIsModalActive(false)} />
                </Modal>}
        </>)
    }

    // return(<>
    //
    //     <Button onClick={e => openModal(true)}>Добавить отель</Button>
    // </>)
    return ({openModal})
}