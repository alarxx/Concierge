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


function getUrl(skip, limit, filter={}){
    return `/api/hotel/room/pagination/?` + new URLSearchParams({
        skip,
        limit,
        sort: 'createdAt',
        ...filter,
    });
}


export default function HotelRoomsList({ hotel={}, upsertFields=f=>f, next= f=>f, back= f=>f }){
    // Логгер просто будет прописывать из какого модуля вызван лог
    // Плюс в production logger не будет выводить в консоль ничего.
    const logger = useMemo(()=>new Logger('HotelRoomsList'), []);

    const [items, setItems] = useState([]);

    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    function onRoomClick(item){
        logger.log("onHotelClick:", item);
        upsertFields({ room: item });
        next();
    }

    const loadMore = async (__skip) => {
        logger.log("__skip:", __skip);

        const limit = 5;

        logger.log(getUrl(skip, limit));


        const response = await fetch(getUrl(skip, limit, {hotel: hotel.id}));

        const data = await response.json();

        // console.log(data); // Logging the data to the console
        // Do something with the data
        if (data.length < limit) {
            setHasMore(false);
        }
        logger.log('isLoadMore',hasMore);

        setItems(() => [
            ...data.reverse(),
            ...items
        ]);

        logger.log(items);

        setSkip(skip + limit);
    };

    return (
        <>
            <NavbarPanel
                LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={e => back()} />}
                title={'Отели'}
            />
            <Box>
                <h1>Infinite Scroll</h1>

                <div className={styles.hotel__list} style={{ height: "100%", overflow: 'auto' }}>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={loadMore}
                        hasMore={hasMore}
                        loader={
                            <div className="loader" key={0}>
                                Loading ...
                            </div>
                        }
                        isReverse={true}
                        useWindow={false}
                    >
                        {items.map((item, i) => (
                            <HotelCard key={i} title={item.name} price={'от 50,000 KZT '} addInfo={'2 взрослых, 2 ночи'} onClick={e => onRoomClick(item)} />
                        ))}
                    </InfiniteScroll>
                </div>
            </Box>

            <BottomControl>
                <Button variant={'outline'} onClick={f=>f}>Оставить на усмотрение менеджеру</Button>
            </BottomControl>

            <NavigationPanel />
        </>
    )
}