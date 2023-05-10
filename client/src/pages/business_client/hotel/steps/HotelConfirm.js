import React, {useMemo} from "react";

import NavbarPanel from "../../../../widgets/navbar_panel/NavbarPanel";
import NavigationPanel from "../../../../widgets/navigation_panel/NavigationPanel";

import HotelPolitics from "../../../../widgets/hotel/hotel_politics/HotelPolitics";
import HotelRoomPrice from "../../../../widgets/hotel/hotel_room_price/HotelRoomPrice";
import HotelRoomDetails from "../../../../widgets/hotel/hotel_room_details/HotelRoomDetails";
import HotelOrderDetails from "../../../../widgets/hotel/hotel_order_details/HotelOrderDetails";

import NavbarLeft from "../../../../shared/ui/navbar/NavbarLeft";
import BottomControl from "../../../../shared/ui/bottom_control/BottomControl";
import Button from "../../../../shared/ui/button/Button";
import Box from "../../../../shared/ui/box/Box";

import BackIcon from "../../../../assets/icons/backbtn_icon.svg";
import Logger from "../../../../internal/Logger";
import Container from "../../../../shared/ui/box/Container";

export default function HotelConfirm({ data={}, submit=f=>f, back=f=>f}) {
    const logger = useMemo(()=>new Logger('HotelConfirm'), []);

    const {hotel, room} = data;

    return(<>
        <NavbarPanel
            LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={e => back()} />}
            title={'Заявка'}
        />

        <Box navbar={true} menu={true} yummy={true}>
            <Container>
                <HotelOrderDetails />
                <HotelPolitics />
                <HotelRoomPrice />
                <HotelRoomDetails />
            </Container>
        </Box>

        <BottomControl>
            <Button variant={'control'} onClick={e => submit()}>Подтвердить заявку</Button>
        </BottomControl>

        <NavigationPanel />
    </>)
}