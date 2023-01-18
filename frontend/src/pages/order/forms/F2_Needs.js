import React, {useEffect} from 'react';
import FormWrapper from "../../../components/form/FormWrapper";
import ServiceItem from "../../../components/form/ServiceItem";

import HouseSVG from "../../../icons/house.svg";
import toggleArrayElement from "../../../handlers/toggleArrayElement";

export default function F2_Needs({needs, updateFields= f=>f}){

    function toggleNeeds(element){
        updateFields({ needs: toggleArrayElement(needs, element) })
    }

    return (
        <>
            <FormWrapper title={"Что вам может понадобиться?"}>
                <ServiceItem
                    caption={"Жилье"} address={"Мы подберем идеальное место, где вы могли бы остановиться"} icon={<HouseSVG/>}
                    active={needs.includes('housing')}
                    onClick={e => toggleNeeds('housing')}
                />
                <ServiceItem
                    caption={"Транспорт"} address={"Машина будет удобным средством передвижения в другом городе или стране"} icon={<HouseSVG/>}
                    active={needs.includes('transport')}
                    onClick={e => toggleNeeds('transport')}
                />
                <ServiceItem
                    caption={"Билеты"} address={"Бронь билетов на самолет или поезд"} icon={<HouseSVG/>}
                    active={needs.includes('travel')}
                    onClick={e => toggleNeeds('travel')}
                />
                <ServiceItem
                    caption={"Другое"} address={"?"} icon={<HouseSVG/>}
                    active={needs.includes('informal')}
                    onClick={e => toggleNeeds('informal')}
                />
            </FormWrapper>
        </>
    );
}
