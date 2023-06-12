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

import BackIcon from "../../../../assets/icons/backbtn_icon.svg";

import MyList from "../../list/MyList";
import Container from "../../../../shared/ui/box/Container";
import ConciergeAction from "../../../../widgets/order/concierge_action/ConciergeAction";
import Loader from "../../../../shared/ui/loader/Loader";


export default function HotelsList({ data={}, hotelsListHandler={}, upsertFields=f=>f, next=f=>f, close=f=>f }){
    // Логгер просто будет прописывать из какого модуля вызван лог
    // Плюс в production logger не будет выводить в консоль ничего.
    const logger = useMemo(()=>new Logger('HotelsList'), []);

    const { city, hotel } = data;
    const { items: hotels, notFound } = hotelsListHandler;

    function onHotelClick(item){
        logger.log("onHotelClick:", item);
        upsertFields({ hotel: item });
        next();
    }

    function Row({ index, style }){
        const item = hotels[index];

        // logger.log(index, item);
        if(!item){ // loading item in list
            return (<>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",}}>
                    <Loader color={'black'}/>
                </div>
            </>);
        }

        item.images = ['https://www.discoverlosangeles.com/sites/default/files/business/hilton-pasadena/h_2000-crm-la-1-hilton-pasadena_port-cochure-e454ef6c5056a36_e454f09a-5056-a36f-233cbb308efaf59d.jpg','https://avatars.mds.yandex.net/get-altay/998237/2a00000161e27a91e164a409a740f64aced7/XXL','https://venturesafrica.com/wp-content/uploads/2018/10/153050202-1-1024x661.jpg','https://www.theartofbusinesstravel.com/wp-content/uploads/2017/04/92275707.jpg','https://salon.ru/storage/thumbs/gallery/179/178992/5000_5000_s763.jpg','https://images.acase.ru/acase_images/1310763/204783592_P.jpg','https://archinect.imgix.net/uploads/9d/9ddc50df6e0ced48dc1b06785a946531.jpg?fit=crop&amp;auto=compress%2Cformat&amp;w=1200','https://images.acase.ru/acase_images/1310763/204733943_P.jpg'];


        return (<>
            <div style={style}>
                <HotelCard
                    images={item.images}
                    stars={item.stars}
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
                LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={e => close()} />}
                title={'Отели'}
            />

            <Box navbar={true} menu={true} yummy={true}>
                <Container>

                    {!notFound && hotels.length === 0 &&
                        <p>loading...</p>
                    }

                    {notFound &&
                        <p>Not found</p>
                    }

                    {!notFound &&
                        <MyList {...hotelsListHandler} itemSize={290}>
                            {Row}
                        </MyList>
                    }

                </Container>
            </Box>

            <BottomControl>
                <ConciergeAction/>
            </BottomControl>

            <NavigationPanel />
        </>);
}