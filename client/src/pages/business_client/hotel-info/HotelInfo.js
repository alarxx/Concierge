import React, {useEffect, useMemo, useState} from "react";

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
import {useAppContext} from "../../../context/AppContext";


export default function HotelInfo({ }) {
    const logger = useMemo(() => new Logger('HotelInfo'), []);

    const navigate = useNavigate();

    const location = useLocation();

    const [previous_page, _] = useState(() => location.state?.previous_page);

    const { id:hotelId } = useParams();

    const {loaderHandler} = useAppContext();
    const {getHotel} = loaderHandler;

    const hotel = getHotel(hotelId);

    if(hotel.isLoading){
        return (<>
            <p>loading...</p>
        </>);
    }

    return(<>
        <NavbarPanel
            LeftButton={previous_page ? <NavbarLeft Icon={<BackIcon />} onClick={e => navigate(previous_page, {replace: true})} /> : null}
            title={'Отель'}
        />

        <Box navbar menu>
            <Container>
                <Gallery height={240} />
                <HotelGeo />
                {/*<HotelChoiceRoom />*/}
                <HotelPolitics hotel={hotel} />
                <HotelDetails hotel={hotel} />
            </Container>
        </Box>

        <NavigationPanel />
    </>)
}