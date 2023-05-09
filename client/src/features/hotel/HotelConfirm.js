import React from "react";

import NavbarPanel from "../../widgets/navbar_panel/NavbarPanel";
import NavigationPanel from "../../widgets/navigation_panel/NavigationPanel";
import HotelPolitics from "../../widgets/hotel/hotel_politics/HotelPolitics";
import HotelRoomPrice from "../../widgets/hotel/hotel_room_price/HotelRoomPrice";
import HotelRoomDetails from "../../widgets/hotel/hotel_room_details/HotelRoomDetails";
import HotelOrderDetails from "../../widgets/hotel/hotel_order_details/HotelOrderDetails";

import NavbarLeft from "../../shared/ui/navbar/NavbarLeft";
import BottomControl from "../../shared/ui/bottom_control/BottomControl";
import Button from "../../shared/ui/button/Button";
import Box from "../../shared/ui/box/Box";

import BackIcon from '../../assets/icons/arrow-left.svg';

export default function HotelConfirm({next=f=>f, back=f=>f}) {
    return(<>
        <NavbarPanel
            LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={e => back()} />}
            title={'Заявка'}
        />

        <Box>
            <HotelOrderDetails />
            <HotelPolitics />
            <HotelRoomPrice />
            <HotelRoomDetails />
        </Box>

        <BottomControl>
            <Button variant={'control'} onClick={e => {
                console.log("HotelConfirm.js: submit");
                next();
            }}>Подтвердить заявку</Button>
        </BottomControl>

        <NavigationPanel />
    </>)
}