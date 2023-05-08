import React, {useState, useEffect, useMemo, useRef} from 'react';

import {useLocation, useNavigate} from "react-router-dom";

import Logger from "../../../internal/Logger";

import InfiniteScroll from "react-infinite-scroller";

import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import {FixedSizeList} from "react-window";

import useBigList from "../../../hooks/useBigList";

import NavbarPanel from '../../../widgets/navbar_panel/NavbarPanel';
import Box from '../../../shared/ui/box/Box'
import NavigationPanel from '../../../widgets/navigation_panel/NavigationPanel';
import HotelCard from "../../../widgets/hotel/hotel_card/HotelCard";
import BottomControl from "../../../shared/ui/bottom_control/BottomControl";
import Button from "../../../shared/ui/button/Button";
import NavbarLeft from "../../../shared/ui/navbar/NavbarLeft";
import BackIcon from "../../../assets/icons/arrow-left.svg";
import HotelRoomCard from "../../../widgets/hotel/hotel_room_card/HotelRoomCard";

import styles from './hotel.module.css';


export default function HotelsList(){
    // Логгер просто будет прописывать из какого модуля вызван лог
    // Плюс в production logger не будет выводить в консоль ничего.
    const logger = useMemo(()=>new Logger('HotelsList'), []);

    const navigate = useNavigate();

    const {
        items,
        isItemLoaded,
        loadMoreItems,
        itemCountLoader,
        itemCountList
    } = useBigList('/api/hotel/pagination/');


    return (
        <>
            <NavbarPanel
                LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={e => navigate('/hotel/single', {replace: true,})} />}
                title={'Номера'}
            />

            <Box>
                <InfiniteLoader
                    isItemLoaded={isItemLoaded}
                    loadMoreItems={loadMoreItems}
                    itemCount={itemCountLoader}
                >
                    {({onItemsRendered, ref}) => (<>
                        <AutoSizer ref={ref}>
                            {({ height, width }) => (
                                <FixedSizeList
                                    className={'List'}
                                    width={width}
                                    height={height}
                                    itemCount={itemCountList}
                                    itemSize={290}
                                    ref={ref}
                                    onItemsRendered={onItemsRendered}
                                >
                                    {({index, style}) => {
                                        const item = items[index];
                                        // logger.log(index, item)
                                        return (<div style={style}>
                                            {item
                                                ? <HotelRoomCard title={item.name} price={'от 50,000 KZT '} addInfo={'2 взрослых, 2 ночи'} onClick={e => navigate('/hotel/room/single', {replace: true,})} />
                                                : <p>"Loading..."</p> }
                                        </div>);
                                    }}
                                </FixedSizeList>
                            )}
                        </AutoSizer>
                    </>)}
                </InfiniteLoader>

            </Box>

            <BottomControl>
                <Button variant={'outline'} onClick={f=>f}>Оставить на усмотрение менеджеру</Button>
            </BottomControl>

            <NavigationPanel />
        </>);
}