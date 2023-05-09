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

import BackIcon from "../../../../assets/icons/arrow-left.svg";

import styles from "../hotel.module.css";
import HotelRoomCard from "../../../../widgets/hotel/hotel_room_card/HotelRoomCard";
import MyList from "../../list/MyList";


export default function HotelRoomsList({ data={}, roomsListHandler={}, upsertFields=f=>f, next=f=>f, back=f=>f }){

    // Логгер просто будет прописывать из какого модуля вызван лог
    // Плюс в production logger не будет выводить в консоль ничего.
    const logger = useMemo(()=>new Logger('HotelRoomsList'), []);

    const {hotel} = data;
    const {items} = roomsListHandler;

    function onRoomClick(item){
        logger.log("onHotelClick:", item);
        upsertFields({ room: item });
        next();
    }

    function Row({ index, style }){
        const item = items[index];

        // logger.log(index, item);
        if(!item){
            return (<>
                <div style={style}>
                    <p>Loading...</p>
                </div>
            </>);
        }

        return (<>
            <div style={style}>
                <HotelRoomCard
                    title={item.name}
                    price={item.price ? item.price : 'от 50,000 KZT'}
                    addInfo={'2 взрослых, 2 ночи'}
                    onClick={e => onRoomClick(item)}
                />
            </div>
        </>);
    }

    return (
        <>
            <NavbarPanel
                LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={e => back()} />}
                title={'Номера'}
            />
            <Box>
                <MyList {...roomsListHandler} itemSize={290}>
                    {Row}
                </MyList>
            </Box>

            <BottomControl>
                <Button variant={'outline'} onClick={f=>f}>Оставить на усмотрение менеджеру</Button>
            </BottomControl>

            <NavigationPanel />
        </>
    )
}