import React, {useState} from 'react';
import FormWrapper from "../../../formComponents/FormWrapper";

import Search from "../../../formComponents/Search";
import CardItem from "../../../formComponents/CardItem";
import Cards from "../../../formComponents/Cards";
import ServiceItem from "../../../formComponents/ServiceItem";
import HouseSVG from "../../../../icons/house.svg";
import Checkbox from "../../../formComponents/Checkbox";

export default function F7_Transport({updateFields= f=>f}){
    return (
        <>
            <FormWrapper title={"Транспорт для командировки"}>
                <ServiceItem caption={"Машина"} icon={HouseSVG}/>
                <ServiceItem caption={"Лимузин"} address={"70 квартир"} icon={HouseSVG}/>
                <Checkbox label={"С водителем"} for_id={"condition1"}/>
            </FormWrapper>
        </>
    );
}
