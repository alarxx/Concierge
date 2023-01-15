import React from 'react';
import FormWrapper from "../../../formComponents/FormWrapper";
import ServiceItem from "../../../formComponents/ServiceItem";

import HouseSVG from "../../../../icons/house.svg";

export default function F1_Plans({updateFields=f=>f}){
    return (
        <>
            <FormWrapper title={"Что вы планируете организовать?"}>
                <ServiceItem caption={"Командировка"} address={"description"} icon={HouseSVG}/>
                <ServiceItem caption={"Мероприятие"} address={"description"} icon={HouseSVG}/>
            </FormWrapper>
        </>
    );
}
