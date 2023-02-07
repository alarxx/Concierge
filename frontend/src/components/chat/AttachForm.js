import React, {useState} from 'react'

import Workflow from '../phone/Workflow';
import Workspace from '../phone/Workspace';

export default function AttachForm({title, onClose=f=>f, children}){

    return (
        <Workflow>
            <Workspace>
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
            </Workspace>
        </Workflow>
    );
}