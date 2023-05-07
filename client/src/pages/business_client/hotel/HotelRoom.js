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
import HotelMealsChoice from "../../../widgets/hotel/hotel_meals_choice/HotelMealsChoice";
import HotelRoomPrice from "../../../widgets/hotel/hotel_room_price/HotelRoomPrice";
import HotelRoomDetails from "../../../widgets/hotel/hotel_room_details/HotelRoomDetails";

export default function HotelRoom() {
    const navigate = useNavigate();
    return(<>
        <NavbarPanel title={'Hotel Room'} />

        <Box>
            <Gallery height={240} />
            <HotelMealsChoice />
            <HotelRoomPrice />
            <HotelRoomDetails />
        </Box>

        <BottomControl>
            <Button variant={'control'} onClick={e => navigate('/orders', {replace: true,})}>Отправить заявку</Button>
        </BottomControl>

        <NavigationPanel />
    </>)
}