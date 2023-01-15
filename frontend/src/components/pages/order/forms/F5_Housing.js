import React from 'react';
import FormWrapper from "../../../formComponents/FormWrapper";
import ServiceItem from "../../../formComponents/ServiceItem";

import HouseSVG from "../../../../icons/house.svg";
import DatesPicker from "../../../formComponents/DatesPicker";
import Checkbox from "../../../formComponents/Checkbox";

export default function F5_Housing({updateFields= f=>f}){
    return (
        <>
            <FormWrapper title={"Где вы хотите оставновиться?"}>
                <ServiceItem caption={"Отель"} address={"С нами сотрудичают более 500 отелей"} icon={HouseSVG}/>
                <ServiceItem caption={"Квартира"} address={"70 квартир"} icon={HouseSVG}/>
                <Checkbox label={"Каждому сотруднику предоставить отдельную квартиру"} for_id={"condition1"}/>
            </FormWrapper>
        </>
    );
}
