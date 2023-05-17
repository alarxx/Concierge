import React, {useMemo} from "react";

import NavbarPanel from "../../../../widgets/navbar_panel/NavbarPanel";
import NavigationPanel from "../../../../widgets/navigation_panel/NavigationPanel";

import HotelMealsChoice from "../../../../widgets/hotel/hotel_meals_choice/HotelMealsChoice";
import HotelRoomPrice from "../../../../widgets/hotel/hotel_room_price/HotelRoomPrice";
import HotelRoomDetails from "../../../../widgets/hotel/hotel_room_details/HotelRoomDetails";

import BottomControl from "../../../../shared/ui/bottom_control/BottomControl";
import Button from "../../../../shared/ui/button/Button";
import Box from "../../../../shared/ui/box/Box";
import Gallery from "../../../../shared/ui/gallery/Gallery";
import NavbarLeft from "../../../../shared/ui/navbar/NavbarLeft";

import BackIcon from "../../../../assets/icons/backbtn_icon.svg";
import Logger from "../../../../internal/Logger";
import Container from "../../../../shared/ui/box/Container";

export default function __HotelRoom({ data={}, back= f=>f, next= f=>f }) {
    const logger = useMemo(()=>new Logger('HotelRoom'), []);

    const { room } = data;

    return(<>
        <NavbarPanel
            LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={e => back()} />}
            title={'Номер'}
        />

        <Box navbar={true} menu={true} yummy={true}>
            <Container>
                <Gallery height={240} />
                <HotelMealsChoice />
                <HotelRoomPrice />
                <HotelRoomDetails />
            </Container>
        </Box>

        <BottomControl>
            <Button variant={'control'} onClick={e => next()}>Отправить заявку</Button>
        </BottomControl>

        <NavigationPanel />
    </>)
}