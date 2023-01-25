import React, {useState} from 'react';
import FormWrapper from "../../../components/form/FormWrapper";

import ServiceItem from "../../../components/form/ServiceItem";
import HouseSVG from "../../../assets/icons/house.svg";
import Checkbox from "../../../components/form/Checkbox";

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
