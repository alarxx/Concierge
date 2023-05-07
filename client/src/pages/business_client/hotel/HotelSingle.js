import React from "react";
import NavbarPanel from "../../../widgets/navbar_panel/NavbarPanel";
import BottomControl from "../../../shared/ui/bottom_control/BottomControl";
import Button from "../../../shared/ui/button/Button";
import NavigationPanel from "../../../widgets/navigation_panel/NavigationPanel";
import {useNavigate} from "react-router-dom";
import Box from "../../../shared/ui/box/Box";
import Gallery from "../../../shared/ui/gallery/Gallery";
import HotelGeo from "../../../widgets/hotel_geo/HotelGeo";
import HotelChoiceRoom from "../../../widgets/hotel_choice_room/HotelChoiceRoom";

export default function HotelSingle() {
    const navigate = useNavigate();
    return(<>
        <NavbarPanel title={'Hotel Single'} />

        <Box>
            <Gallery height={240} />
            <HotelGeo />
            <HotelChoiceRoom />
        </Box>

        <BottomControl>
            <Button variant={'control'} onClick={e => navigate('/hotel/room', {replace: true,})}>Выбрать комнату (X)</Button>
        </BottomControl>

        <NavigationPanel />
    </>)
}