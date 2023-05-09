import React, {useMemo} from 'react';
import {useNavigate} from "react-router-dom";

import Logger from "../../../../internal/Logger";

import HotelCard from "../../../../widgets/hotel/hotel_card/HotelCard";
import HotelRoomCard from "../../../../widgets/hotel/hotel_room_card/HotelRoomCard";
import NavbarPanel from "../../../../widgets/navbar_panel/NavbarPanel";
import NavigationPanel from "../../../../widgets/navigation_panel/NavigationPanel";

import NavbarLeft from "../../../../shared/ui/navbar/NavbarLeft";
import Box from "../../../../shared/ui/box/Box";
import BottomControl from "../../../../shared/ui/bottom_control/BottomControl";
import Button from "../../../../shared/ui/button/Button";

import BackIcon from "../../../../assets/icons/arrow-left.svg";

import MyList from "../../list/MyList";


export default function HotelsList({ data={}, hotelsListHandler={}, upsertFields=f=>f, next=f=>f }){
    const { city, hotel } = data;

    // Логгер просто будет прописывать из какого модуля вызван лог
    // Плюс в production logger не будет выводить в консоль ничего.
    const logger = useMemo(()=>new Logger('HotelsList'), []);

    const navigate = useNavigate();

    const { items } = hotelsListHandler;

    function onHotelClick(item){
        logger.log("onHotelClick:", item);
        upsertFields({ hotel: item });
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
                <HotelCard
                    title={item.name}
                    price={item.price ? item.price : 'от 50,000 KZT'}
                    addInfo={'2 взрослых, 2 ночи'}
                    onClick={e => onHotelClick(item)}
                />
            </div>
        </>);
    }


    return (
        <>
            <NavbarPanel
                LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={e => navigate('/new', {
                    replace: true,
                    state: { data }
                })} />}

                title={'Отели'}
            />

            <Box>
                <MyList {...hotelsListHandler} itemSize={290}>
                    {Row}
                </MyList>
            </Box>

            <BottomControl>
                <Button variant={'outline'} onClick={f=>f}>Оставить на усмотрение менеджеру</Button>
            </BottomControl>

            <NavigationPanel />
        </>);
}