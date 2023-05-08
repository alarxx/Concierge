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
import NavbarLeft from "../../../shared/ui/navbar/NavbarLeft";
import BackIcon from "../../../assets/icons/arrow-left.svg";

export default function HotelRoom() {
    const navigate = useNavigate();
    return(<>
        <NavbarPanel
            LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={e => navigate('/hotel/room', {replace: true,})} />}
            title={'Номер'}
        />

        <Box>
            <Gallery height={240} />
            <HotelMealsChoice />
            <HotelRoomPrice />
            <HotelRoomDetails />
        </Box>

        <BottomControl>
            <Button variant={'control'} onClick={e => navigate('/hotel/room/single/booking', {replace: true,})}>Отправить заявку</Button>
        </BottomControl>

        <NavigationPanel />
    </>)
}