import React, {useState, useEffect, useMemo} from 'react';

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
import {useNavigate} from "react-router-dom";
import NavbarLeft from "../../../shared/ui/navbar/NavbarLeft";
import BackIcon from "../../../assets/icons/arrow-left.svg";


export default function HotelList({}){
    const navigate = useNavigate();
    // Логгер просто будет прописывать из какого модуля вызван лог
    // Плюс в production logger не будет выводить в консоль ничего.
    const logger = useMemo(()=>new Logger('Orders'), []);

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
                LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={e => navigate('/new', {replace: true,})} />}
                title={'Отели'}
            />
            <Box>

                {/* +100000 позволяет нам использовать максимально заданное число элементов(по ум. 30+-), которые можно загрузить за раз, если добавим 1 будет грузиться 1 элемент */}
                <InfiniteLoader
                    isItemLoaded={isItemLoaded}
                    loadMoreItems={loadMoreItems}
                    itemCount={itemCountLoader}
                >
                    {({onItemsRendered, ref}) => {
                        {/* +1 позволяет нам показывать loading элемент, если добавим 2 будут 2 loading элемента, что нам не нужно */}
                        return (<>
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

                                    console.log("ITEM",item)

                                    const queryParams = {
                                        param1: 'value1',
                                        param2: 'value2',
                                    };
                                    // logger.log(index, item)
                                    return (<div style={style}>
                                        {item
                                            ? <HotelCard title={item.name} price={'от 50,000 KZT '} addInfo={'2 взрослых, 2 ночи'} onClick={e => navigate('/hotel/single', {search: `?${new URLSearchParams(queryParams).toString()}`, replace: true,})} />
                                            : <p>"Loading..."</p> }
                                    </div>);
                                }}
                            </FixedSizeList>
                        )}
                        </AutoSizer>
                        </>);
                    }}
                </InfiniteLoader>

            </Box>
            <BottomControl>
                <Button variant={'outline'} onClick={f=>f}>Оставить на усмотрение менеджеру</Button>
            </BottomControl>
            <NavigationPanel />
        </>
    )
}