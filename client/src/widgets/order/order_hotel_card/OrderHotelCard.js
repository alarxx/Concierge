import React, {useEffect, useMemo, useState} from 'react'
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
import dateToForm from "../../../internal/order/date_toString";
import getCity from "../../../internal/order/getCity";
import dateRange_toString from "../../../internal/order/dateRange_toString";
import numberOfPeople_toString from "../../../internal/order/numberOfPeople_toString";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppContext} from "../../../context/AppContext";


export default function OrderHotelCard({ hotel_booking={} }) {
    const logger = useMemo(()=>new Logger('OrderHotelCard'), [])

    const location = useLocation();

    const navigate = useNavigate();
    const {loaderHandler} = useAppContext();
    const {getHotel} = loaderHandler;

    function navigateToHotel(){
        navigate(`/hotels/${hotel_booking.hotel}`, {
            state: {
                previous_page: location.pathname
            }
        });
    }

    // const status = statusEnum[hotel_booking.status];

    // hotel нужно fetch-ить
    const hotel = getHotel(hotel_booking.hotel); // {city: 'City', name: 'Hotel Name', isLoading: true}

    if(hotel.isLoading){
        return (<>
            <CardService onClick={navigateToHotel}>
                <CardBody>
                    <div>
                        <Typography size={14} weight={500} bottom={2}>loading...</Typography>
                    </div>
                </CardBody>
            </CardService>
        </>);
    }

    return(<>
        <CardService onClick={navigateToHotel}>
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
                    <Typography size={14} weight={500} bottom={2}>{dateRange_toString(hotel_booking.check_in_date, hotel_booking.check_out_date)} - {numberOfPeople_toString(hotel_booking.number_of_adults, hotel_booking.number_of_children)}</Typography>
                </div>
                {/*<div>
                    <Typography size={14} weight={500} bottom={2} color={'#959BA1'}>Lux на 2, № 1 - Питание: BB</Typography>
                </div>*/}
            </CardBody>
        </CardService>
    </>)
}