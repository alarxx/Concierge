import React, {useEffect, useMemo} from 'react'
import Card from "../../../shared/ui/card/Card";
import CardServiceHeader from "../../../shared/ui/card_service/CardServiceHeader";
import CardServiceBody from "../../../shared/ui/card_service/CardServiceBody";
import CardServiceFooter from "../../../shared/ui/card_service/CardServiceFooter";
import Typography from "../../../shared/ui/typography/Typography";
import GroupFlex from "../../../shared/ui/group_flex/GroupFlex";
import ButtonLike from "../../../shared/ui/button_like/ButtonLike";
import CardService from "../../../shared/ui/card_service/CardService";
import Gallery from "../../../shared/ui/gallery/Gallery";
import Stars from "../../../shared/ui/stars/Stars";
import Chip from "../../../shared/ui/chip/Chip";
import CardHeader from "../../../shared/ui/card/CardHeader";
import CardBody from "../../../shared/ui/card/CardBody";
import Block from "../../../shared/ui/block/Block";
import statusEnum from "../../../internal/order/StatusEnum";
import Logger from "../../../internal/Logger";

import monthName from "../../../internal/monthName";

function getCity(fullcity){
    const words = fullcity?.split(",", 2); // 'Казахстан, Астана'.split(",", 2);
    return words?.length === 2 ? words[1]: words;
}

function dateToForm(date){
    const _date = new Date(date);
    console.log("dateToForm", monthName(_date.getMonth()));
    return `${_date.getDate()} ${monthName(_date.getMonth()).substring(0, 3).toLowerCase()}`;
}

export default function OrderHotelCard({ hotelmeta, hotel, hotel_booking={}, onClick=f=>f }) {

    const logger = useMemo(()=>new Logger('OrderHotelCard'), [])

    const status = statusEnum[hotel_booking.status];

    useEffect(()=>{
        logger.log({hotelmeta});
    }, [])

    return(<>
        <CardService onClick={onClick}>
            <CardBody>
                <Block bottom={8}>
                    <Gallery/>
                </Block>

                <GroupFlex align={'ais'} justify={'jcsb'}>
                    <div>
                        <div><Typography size={16} weight={600} bottom={2}>{`${getCity(hotel.city)}, ${hotel.name}`}</Typography></div>
                        {/*<div> <Typography size={16} weight={600} bottom={4} color={'#959BA1'}>Заказ #6723</Typography></div>*/}
                    </div>
                    {/*<Chip text={status.text} variant={status.variant} />*/}
                </GroupFlex>
            </CardBody>
            <CardBody>
                <div>
                    <Typography size={14} weight={500} bottom={2}>{dateToForm(hotelmeta.check_in_date)} - {dateToForm(hotelmeta.check_out_date)} - {hotelmeta.number_of_adults} {hotelmeta.number_of_adults > 1 ? 'взрослых' : 'взрослый'}</Typography>
                </div>
                {/*<div>
                    <Typography size={14} weight={500} bottom={2} color={'#959BA1'}>Lux на 2, № 1 - Питание: BB</Typography>
                </div>*/}
            </CardBody>
        </CardService>
    </>)
}