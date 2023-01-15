import React from 'react';
import FormWrapper from "../../../formComponents/FormWrapper";
import ServiceItem from "../../../formComponents/ServiceItem";

import HouseSVG from "../../../../icons/house.svg";

export default function F2({}){
    return (
        <>
            <FormWrapper title={"Что вам может понадобиться?"}>
                <ServiceItem caption={"Жилье"} address={"Мы подберем идеальное место, где вы могли бы остановиться"} icon={HouseSVG}/>
                <ServiceItem caption={"Транспорт"} address={"Машина будет удобным средством передвижения в другом городе или стране"} icon={HouseSVG}/>
                <ServiceItem caption={"Билеты"} address={"Бронь билетов на самолет или поезд"} icon={HouseSVG}/>
                <ServiceItem caption={"Другое"} address={"?"} icon={HouseSVG}/>
            </FormWrapper>
        </>
    );
}
