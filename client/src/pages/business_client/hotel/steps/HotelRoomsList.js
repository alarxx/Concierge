import React, {useState, useEffect, useMemo} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";

import Logger from "../../../../internal/Logger";

import NavbarPanel from '../../../../widgets/navbar_panel/NavbarPanel';
import NavigationPanel from '../../../../widgets/navigation_panel/NavigationPanel';
import HotelCard from "../../../../widgets/hotel/hotel_card/HotelCard";

import Box from '../../../../shared/ui/box/Box'
import BottomControl from "../../../../shared/ui/bottom_control/BottomControl";
import Button from "../../../../shared/ui/button/Button";
import NavbarLeft from "../../../../shared/ui/navbar/NavbarLeft";

import BackIcon from "../../../../assets/icons/backbtn_icon.svg";

import styles from "../hotel.module.css";
import HotelRoomCard from "../../../../widgets/hotel/hotel_room_card/HotelRoomCard";
import MyList from "../../list/MyList";
import Alert from "../../../../shared/ui/alert/Alert";
import Container from "../../../../shared/ui/box/Container";
import ConciergeAction from "../../../../widgets/order/concierge_action/ConciergeAction";


export default function HotelRoomsList({ data={}, upsertFields=f=>f, next=f=>f, back=f=>f }){
    const logger = useMemo(()=>new Logger('HotelRoomsList'), []);

    const { hotel } = data;
    const { rooms } = hotel;

    function onRoomClick(item){
        logger.log("onHotelClick:", item);
        upsertFields({ room: item });
        next();
    }

    return (
        <>
            <NavbarPanel
                LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={e => back()} />}
                title={'Номера'}
            />
            <Box navbar={true} menu={true} yummy={true}>
                <Container>

                    {rooms.length === 0 &&
                        <Alert>
                            <p>Not found</p>
                        </Alert>
                    }

                    {rooms.map((room, i)=>{
                        return (<>
                            <div key={i}>
                                <HotelRoomCard
                                    title={room.name}
                                    price={room.price ? room.price : 'от 50,000 KZT'}
                                    addInfo={'2 взрослых, 2 ночи'}
                                    onClick={e => onRoomClick(room)}
                                />
                            </div>
                        </>);
                    })}

                </Container>
            </Box>

            <BottomControl>
                <ConciergeAction/>
            </BottomControl>

            <NavigationPanel />
        </>
    )
}