import React from 'react';
import FormWrapper from "../../../form/FormWrapper";
import ServiceItem from "../../../form/ServiceItem";

import HouseSVG from "../../../../icons/house.svg";

export default function F1_Plans({type, updateFields=f=>f }){
    return (
        <>
            <FormWrapper title={"Что вы планируете организовать?"}>
                <ServiceItem
                    caption={"Командировка"} address={"description"} icon={<HouseSVG />}
                    active={type === 'business_tripe'}
                    onClick={e => updateFields({type: 'business_tripe'})}
                />
                <ServiceItem
                    caption={"Мероприятие"} address={"description"} icon={<HouseSVG />}
                    active={type === 'event'}
                    onClick={e => updateFields({type: 'event'})}
                />
            </FormWrapper>
        </>
    );
}
