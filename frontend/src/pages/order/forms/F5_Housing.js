import React from 'react';
import FormWrapper from "../../../components/form/FormWrapper";
import ServiceItem from "../../../components/form/ServiceItem";

import HouseSVG from "../../../assets/icons/house.svg";
import DatesPicker from "../../../components/form/DatesPicker";
import Checkbox from "../../../components/form/Checkbox";
//apartment
export default function F5_Housing({ housing, separate_apartments, updateFields= f=>f}){
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
                {housing === 'apartment' && <Checkbox
                    label={"Каждому сотруднику предоставить отдельную квартиру"} for_id={"condition1"}
                    checked={separate_apartments}
                    onChange={e => updateFields({separate_apartments: e.target.checked})}
                />}
            </FormWrapper>
        </>
    );
}
