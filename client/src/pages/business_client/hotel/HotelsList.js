import React, {useState, useEffect, useMemo, useRef} from 'react';

import NavbarPanel from '../../../widgets/navbar_panel/NavbarPanel';
import Box from '../../../shared/ui/box/Box'
import NavigationPanel from '../../../widgets/navigation_panel/NavigationPanel';
import Logger from "../../../internal/Logger";
import useBigList from "../../../hooks/useBigList";
import AutoSizer from "react-virtualized-auto-sizer";
import HotelCard from "../../../widgets/hotel/hotel_card/HotelCard";
import BottomControl from "../../../shared/ui/bottom_control/BottomControl";
import Button from "../../../shared/ui/button/Button";
import InfiniteLoader from "react-window-infinite-loader";
import {FixedSizeList} from "react-window";
import {useLocation, useNavigate} from "react-router-dom";
import NavbarLeft from "../../../shared/ui/navbar/NavbarLeft";
import BackIcon from "../../../assets/icons/arrow-left.svg";

import InfiniteScroll from "react-infinite-scroller";
import styles from './hotel.module.css'

function getUrl(skip, limit){
    return `/api/hotel/pagination/?skip=${skip}&limit=${limit}&sort=createdAt`;
}

export default function HotelsList(){
    const logger = useMemo(()=>new Logger('HotelsList'), []);

    const navigate = useNavigate();

    const location = useLocation();

    // Логгер просто будет прописывать из какого модуля вызван лог
    // Плюс в production logger не будет выводить в консоль ничего.

    const [items, setItems] = useState([]);
    const [skip, setSkip] = useState(0);
    const [isLoadMore, setIsLoadMore] = useState(true)

    const fetchData = async (__skip) => {
        console.log(__skip)
        const limit = 5;
        const response = await fetch(getUrl(skip, limit));
        console.log(getUrl(skip, limit))
        const data = await response.json()
        // console.log(data); // Logging the data to the console
        // Do something with the data
        if (data.length < limit) {
            setIsLoadMore(false)
        }
        console.log('isLoadMore',isLoadMore)
        // setItems([...items, ...data]);
        setItems([...(data.reverse()), ...items]);
        console.log(items)
        setSkip(skip + limit);
    };

    return (
        <>
            <NavbarPanel
                LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={e => navigate('/new', {replace: true,})} />}
                title={'Отели'}
            />
            <Box>
                <h1>Infinite Scroll</h1>

                <div className={styles.hotel__list} style={{ height: "100%", overflow: 'auto' }}>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={fetchData}
                        hasMore={true}
                        loader={
                            <div className="loader" key={0}>
                                Loading ...
                            </div>
                        }
                        isReverse={true}
                        useWindow={false}
                    >
                        {items.map((item, i) => (
                            <HotelCard key={i} title={item.name} price={'от 50,000 KZT '} addInfo={'2 взрослых, 2 ночи'} onClick={e => navigate('/hotel/single', {replace: true,})} />
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