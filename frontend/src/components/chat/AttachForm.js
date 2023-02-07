import React, {useState} from 'react'

import Workflow from '../phone/Workflow';
import Workspace from '../phone/Workspace';
import FormWrapper from "../form/FormWrapper";
import ServiceItem from "../form/ServiceItem";

import HouseSVG from '../../assets/icons/house.svg'

export default function AttachForm({title, onClose=f=>f, children}){

    const [type, setType] = useState('');


    return (
        <Workflow>
            <Workspace>
                <FormWrapper title={title}>
                    <ServiceItem
                        caption={"Командировка"} address={"description"} icon={<HouseSVG />}
                        active={type === 'business_trip'}
                        onClick={e => {}}
                    />
                    <ServiceItem
                        caption={"Мероприятие"} address={"description"} icon={<HouseSVG />}
                        active={type === 'event'}
                        onClick={e => {}}
                    />
                </FormWrapper>
            </Workspace>
        </Workflow>
    );
}