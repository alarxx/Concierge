import React, {useEffect, useMemo} from "react";

import {useNavigate} from "react-router-dom";

import BackIcon from "../../../../assets/icons/arrow-left.svg";

import NavbarPanel from "../../../../widgets/navbar_panel/NavbarPanel";
import BottomControl from "../../../../shared/ui/bottom_control/BottomControl";
import Button from "../../../../shared/ui/button/Button";
import NavigationPanel from "../../../../widgets/navigation_panel/NavigationPanel";
import Box from "../../../../shared/ui/box/Box";
import Gallery from "../../../../shared/ui/gallery/Gallery";
import HotelGeo from "../../../../widgets/hotel/hotel_geo/HotelGeo";
import HotelChoiceRoom from "../../../../widgets/hotel/hotel_choice_room/HotelChoiceRoom";
import HotelPolitics from "../../../../widgets/hotel/hotel_politics/HotelPolitics";
import HotelDetails from "../../../../widgets/hotel/hotel_details/HotelDetails";
import NavbarLeft from "../../../../shared/ui/navbar/NavbarLeft";
import useBigList from "../../../../hooks/useBigList";
import Logger from "../../../../internal/Logger";

function getUrl(skip, limit, filter={}){
    return `/api/hotel/room/pagination/?` + new URLSearchParams({
        skip,
        limit,
        sort: 'createdAt',
        ...filter,
    });
}

export default function HotelSingle({ data={}, roomsListHandler={}, next=f=>f, back=f=>f, }) {
    const logger = useMemo(() => new Logger('HotelSingle'), []);

    const { hotel } = data;
    const {items: rooms} = roomsListHandler;

    return(<>
        <NavbarPanel
            LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={e => back()} />}
            title={'Отель'}
        />

        <Box>
            <Gallery height={240} />
            <HotelGeo />
            <HotelChoiceRoom />
            <HotelPolitics />
            <HotelDetails />
        </Box>

        <BottomControl>
            <Button variant={'control'} onClick={e => next()}>Выбрать комнату (X)</Button>
        </BottomControl>

        <NavigationPanel />
    </>)
}