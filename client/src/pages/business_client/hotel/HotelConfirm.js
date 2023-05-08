import React from "react";
import NavbarPanel from "../../../widgets/navbar_panel/NavbarPanel";
import BottomControl from "../../../shared/ui/bottom_control/BottomControl";
import Button from "../../../shared/ui/button/Button";
import NavigationPanel from "../../../widgets/navigation_panel/NavigationPanel";
import {useNavigate} from "react-router-dom";
import Box from "../../../shared/ui/box/Box";
import Gallery from "../../../shared/ui/gallery/Gallery";
import HotelGeo from "../../../widgets/hotel/hotel_geo/HotelGeo";
import HotelChoiceRoom from "../../../widgets/hotel/hotel_choice_room/HotelChoiceRoom";
import HotelPolitics from "../../../widgets/hotel/hotel_politics/HotelPolitics";
import HotelDetails from "../../../widgets/hotel/hotel_details/HotelDetails";

import BackIcon from '../../../assets/icons/arrow-left.svg'
import NavbarLeft from "../../../shared/ui/navbar/NavbarLeft";
import HotelRoomPrice from "../../../widgets/hotel/hotel_room_price/HotelRoomPrice";
import HotelRoomDetails from "../../../widgets/hotel/hotel_room_details/HotelRoomDetails";
import HotelOrderDetails from "../../../widgets/hotel/hotel_order_details/HotelOrderDetails";

export default function HotelConfirm() {
    const navigate = useNavigate();
    return(<>
        <NavbarPanel
            LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={e => navigate('/hotel/room/single', {replace: true,})} />}
            title={'Заявка'}
        />

        <Box>
            <HotelOrderDetails />
            <HotelPolitics />
            <HotelRoomPrice />
            <HotelRoomDetails />
        </Box>

        <BottomControl>
            <Button variant={'control'} onClick={e => navigate('/orders', {replace: true,})}>Подтвердить заявку</Button>
        </BottomControl>

        <NavigationPanel />
    </>)
}