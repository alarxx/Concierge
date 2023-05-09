import React, {useMemo} from 'react';
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import {FixedSizeList} from "react-window";
import Logger from "../../internal/Logger";
import {useNavigate} from "react-router-dom";
import useBigList from "../../hooks/useBigList";
import HotelRoomCard from "../../widgets/hotel/hotel_room_card/HotelRoomCard";
import NavbarPanel from "../../widgets/navbar_panel/NavbarPanel";
import NavbarLeft from "../../shared/ui/navbar/NavbarLeft";
import BackIcon from "../../assets/icons/arrow-left.svg";
import Box from "../../shared/ui/box/Box";
import BottomControl from "../../shared/ui/bottom_control/BottomControl";
import Button from "../../shared/ui/button/Button";
import NavigationPanel from "../../widgets/navigation_panel/NavigationPanel";

function MyList({
                  items,
                  isItemLoaded,
                  loadMoreItems,
                  itemCountLoader,
                  itemCountList,

                  itemSize=290,

                  children
              }){


    return (<>
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
                            itemSize={itemSize}
                            ref={ref}
                            onItemsRendered={onItemsRendered}
                        >
                            {children}
                        </FixedSizeList>
                    )}
                </AutoSizer>
            </>)}
        </InfiniteLoader>
    </>);
}

export default function HotelsList({ city='', hotel={}, upsertData=f=>f, next=f=>f }){
    // Логгер просто будет прописывать из какого модуля вызван лог
    // Плюс в production logger не будет выводить в консоль ничего.
    const logger = useMemo(()=>new Logger('HotelsList'), []);

    const navigate = useNavigate();

    const bigList = useBigList('/api/hotel/pagination/'); // , { city });
    const { items } = bigList;

    function onHotelClick(item){
        logger.log("onHotelClick:", item);
        upsertData({ hotel: item });
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
                    state: { data: { city } }
                })} />}

                title={'Отели'}
            />

            <Box>
                <MyList {...bigList} itemSize={290}>
                    {Row}
                </MyList>
            </Box>

            <BottomControl>
                <Button variant={'outline'} onClick={f=>f}>Оставить на усмотрение менеджеру</Button>
            </BottomControl>

            <NavigationPanel />
        </>);
}