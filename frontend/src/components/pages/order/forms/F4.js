import React from 'react';
import FormWrapper from "../../../formComponents/FormWrapper";
import ServiceItem from "../../../formComponents/ServiceItem";

import HouseSVG from "../../../../icons/house.svg";
import DatesPicker from "../../../formComponents/DatesPicker";
import Checkbox from "../../../formComponents/Checkbox";

export default function F4({}){
    return (
        <>
            <FormWrapper title={"Билеты"} undertitle={"На чем вы хотите добраться до места назначения?"}>
                <ServiceItem caption={"Самолет"} address={"При желании заказать частный самолет, цену стоит повторно уточнить у менеджера"} icon={HouseSVG}/>
                <ServiceItem caption={"Поезд"} address={"При расчете учитываются билеты на места в купе. Цена для других случаев уточняется у менеджера"} icon={HouseSVG}/>
                <DatesPicker />
                <Checkbox label={"Билет в обе стороны"} for_id={"condition1"}/>
            </FormWrapper>
        </>
    );
}
