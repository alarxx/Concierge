import React, {useState} from 'react';
import FormWrapper from "../../../formComponents/FormWrapper";

import Search from "../../../formComponents/Search";
import CardItem from "../../../formComponents/CardItem";
import Cards from "../../../formComponents/Cards";
import ServiceItem from "../../../formComponents/ServiceItem";
import HouseSVG from "../../../../icons/house.svg";
import Checkbox from "../../../formComponents/Checkbox";

export default function F7_Transport({transport, driverNeeded, updateFields= f=>f}){
    return (
        <>
            <FormWrapper title={"Транспорт для командировки"}>
                <ServiceItem caption={"Машина"} icon={<HouseSVG/>}
                             active={transport === 'car'}
                             onClick={ e => updateFields({transport: 'car'}) }
                />
                <ServiceItem caption={"Лимузин"} icon={<HouseSVG/>}
                             active={transport === 'limousine'}
                             onClick={ e => updateFields({transport: 'limousine'}) }
                />
                <Checkbox label={"С водителем"} for_id={"condition1"}
                          checked={driverNeeded}
                          onChange={e => updateFields({driverNeeded: e.target.checked})}
                />
            </FormWrapper>
        </>
    );
}
