import React, {useEffect, useMemo} from "react";

import {useLocation, useNavigate, useParams} from "react-router-dom";

import Logger from "../../../internal/Logger";

import BackIcon from "../../../assets/icons/backbtn_icon.svg";

import NavbarPanel from "../../../widgets/navbar_panel/NavbarPanel";
import BottomControl from "../../../shared/ui/bottom_control/BottomControl";
import Button from "../../../shared/ui/button/Button";
import NavigationPanel from "../../../widgets/navigation_panel/NavigationPanel";
import Box from "../../../shared/ui/box/Box";
import Gallery from "../../../shared/ui/gallery/Gallery";
import HotelGeo from "../../../widgets/hotel/hotel_geo/HotelGeo";
import HotelPolitics from "../../../widgets/hotel/hotel_politics/HotelPolitics";
import HotelDetails from "../../../widgets/hotel/hotel_details/HotelDetails";
import NavbarLeft from "../../../shared/ui/navbar/NavbarLeft";
import Container from "../../../shared/ui/box/Container";


export default function HotelInfo({ }) {
    const logger = useMemo(() => new Logger('HotelInfo'), []);

    const { id:hotelId } = useParams();

    const hotel = {};

    return(<>
        <NavbarPanel
            LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={e => back()} />}
            title={'Отель'}
        />

        <Box navbar={true} menu={true} yummy={true}>
            <Container>
                <Gallery height={240} />
                <HotelGeo />
                {/*<HotelChoiceRoom />*/}
                <HotelPolitics hotel={hotel} />
                <HotelDetails hotel={hotel} />
            </Container>
        </Box>

        <BottomControl>
            <Button variant={'control'} onClick={e => next()}>Выбрать отель</Button>
        </BottomControl>

        <NavigationPanel />
    </>)
}