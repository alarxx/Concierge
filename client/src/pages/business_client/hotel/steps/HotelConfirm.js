import React, {useMemo, useState} from "react";

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
import Loading from "../../../../shared/loading/Loading";

export default function HotelConfirm({ data={}, submit=f=>f, back=f=>f}) {
    const logger = useMemo(()=>new Logger('HotelConfirm'), []);

    const {hotel, room, meta} = data;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    function onSubmit(e){
        setLoading(true);
        submit();
    }

    return(<>
        {loading && <Loading />}

        <NavbarPanel
            LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={e => back()} />}
            title={'Заявка'}
        />

        <Box navbar={true} menu={true} yummy={true}>
            <Container>
                <HotelOrderDetails data={data} hotel={hotel}/>
                <HotelPolitics />
                {/*<HotelRoomPrice />*/}
                {/*<HotelRoomDetails />*/}
            </Container>
        </Box>

        <BottomControl>
            <Button variant={'control'} onClick={onSubmit}>Подтвердить заявку</Button>
        </BottomControl>

        <NavigationPanel />
    </>)
}