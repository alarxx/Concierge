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
import {useLocation, useNavigate} from "react-router-dom";
import {useAppContext} from "../../../../context/AppContext";
import GroupInline from "../../../../shared/ui/group_inline/GroupInline";
import AppBar from "../../../../shared/ui/app_bar/AppBar";
import Block from "../../../../shared/ui/block/Block";
import Logo from "../../../../shared/ui/logo/Logo";
import Nav from "../../../../shared/ui/nav/Nav";
import NavLink from "../../../../shared/ui/nav/NavLink";

const HotelConfirmPage = ({ data={}, submit=f=>f}) => {

    const logger = useMemo(()=>new Logger('HotelConfirm'), []);

    const {hotel, room, meta} = data;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    function onSubmit(e){
        setLoading(true);
        submit();
    }

    return (<>
        {loading && <Loading />}

        <HotelOrderDetails
            hotel_name={hotel.name}
            hotel_city={hotel.city}
            check_in_date={data.check_in_date}
            check_out_date={data.check_out_date}
            number_of_adults={data.number_of_adults}
            number_of_children={data.number_of_children}
            address={hotel.address}
            stars={hotel.stars}
        />
        <HotelPolitics />

        <BottomControl>
            <Button variant={'control'} onClick={onSubmit}>Подтвердить заявку</Button>
        </BottomControl>
        {/*<HotelRoomPrice />*/}
        {/*<HotelRoomDetails />*/}
    </>)
}
export default function HotelConfirm({ data={}, submit=f=>f, back=f=>f}) {

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { adaptiveHandler } = useAppContext();
    const { device } = adaptiveHandler;

    if (device === 'mobile') {
        return (<>
            <NavbarPanel
                LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={e => back()} />}
                title={'Заявка'}
            />

            <Box navbar={true} menu={true} yummy={true}>
                <Container>
                    <HotelConfirmPage data={data} submit={submit} />
                </Container>
            </Box>

            <NavigationPanel />
        </>)
    } else {
        return (<>
            <GroupInline width={'100%'} height={'100%'}>
                <AppBar left={true} isClientView={true}>
                    <Block>
                        <Logo/>
                        <Block top={80} isAlignCenter={true}>
                            <Nav block={true}>
                                <NavLink active={pathname.startsWith('/new')} text={'Главная'} onClick={e => navigate('/new', {replace: true,})}/>
                                <NavLink active={pathname.startsWith('/orders')} text={'Заказы'} onClick={e => navigate('/orders', {replace: true,})}/>
                                <NavLink active={pathname.startsWith('/chat')} text={'Чат'} onClick={e => navigate('/chat', {replace: true,})}/>
                                <NavLink active={pathname.startsWith('/profile')} text={'Сервисы'} onClick={e => navigate('/profile', {replace: true,})}/>
                            </Nav>
                        </Block>
                    </Block>
                </AppBar>
                <Container padding={'20px'}>
                    <HotelConfirmPage data={data} submit={submit} />
                </Container>
            </GroupInline>
        </>)
    }
}