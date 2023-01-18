import React from 'react';
import FormWrapper from "../../../components/form/FormWrapper";
import ServiceItem from "../../../components/form/ServiceItem";

import HouseSVG from "../../../icons/house.svg";
import DatesPicker from "../../../components/form/DatesPicker";
import Checkbox from "../../../components/form/Checkbox";
//apartment
export default function F5_Housing({ housing, separateApartments, updateFields= f=>f}){
    return (
        <>
            <FormWrapper title={"Где вы хотите оставновиться?"}>
                <ServiceItem
                    caption={"Отель"} address={"С нами сотрудичают более 500 отелей"} icon={<HouseSVG/>}
                    active={housing === 'hotel'}
                    onClick={ e => updateFields({housing: 'hotel'}) }
                />
                <ServiceItem
                    caption={"Квартира"} address={"70 квартир"} icon={<HouseSVG/>}
                    active={housing === 'apartment'}
                    onClick={ e => updateFields({housing: 'apartment'}) }
                />
                <Checkbox
                    label={"Каждому сотруднику предоставить отдельную квартиру"} for_id={"condition1"}
                    checked={separateApartments}
                    onChange={e => updateFields({separateApartments: e.target.checked})}
                />
            </FormWrapper>
        </>
    );
}
