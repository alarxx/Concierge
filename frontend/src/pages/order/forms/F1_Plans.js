import React, {useEffect} from 'react';
import FormWrapper from "../../../components/form/FormWrapper";
import ServiceItem from "../../../components/form/ServiceItem";

import HouseSVG from "../../../assets/icons/house.svg";

export default function F1_Plans({type, updateFields=f=>f }){
    return (
        <>
            <FormWrapper title={"Что вы планируете организовать?"}>
                <ServiceItem
                    caption={"Командировка"} address={"description"} icon={<HouseSVG />}
                    active={type === 'business_trip'}
                    onClick={e => updateFields({type: 'business_trip'})}
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
