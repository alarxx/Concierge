import React from 'react';
import FormWrapper from "../../../components/form/FormWrapper";
import ServiceItem from "../../../components/form/ServiceItem";

import HouseSVG from "../../../assets/icons/house.svg";
import DatesPicker from "../../../components/form/DatesPicker";
import Checkbox from "../../../components/form/Checkbox";

export default function F4_Tickets({
                                       travel_transport,
                                       date_start,
                                       date_end,
                                       one_way_ticket,
                                       updateFields=f=>f }){

    return (
        <>
            <FormWrapper title={"Билеты"} undertitle={"На чем вы хотите добраться до места назначения?"}>

                <ServiceItem
                    caption={"Самолет"}
                    address={"При желании заказать частный самолет, цену стоит повторно уточнить у менеджера"}
                    icon={<HouseSVG/>}
                    active={travel_transport === 'airplane'}
                    onClick={ e => updateFields({travel_transport: 'airplane'}) }
                />

                <ServiceItem
                    caption={"Поезд"}
                    address={"При расчете учитываются билеты на места в купе. Цена для других случаев уточняется у менеджера"}
                    icon={<HouseSVG/>}
                    active={travel_transport === 'train'}
                    onClick={ e => updateFields({travel_transport: 'train'}) }
                />

                <DatesPicker
                    date_start={date_start}
                    date_start_key={"date_start"}

                    date_end={date_end}
                    date_end_key={"date_end"}

                    one_way_ticket={one_way_ticket}

                    updateFields={updateFields}
                />

                <Checkbox
                    label={"Билет в одну сторону"} for_id={"condition1"}
                    checked={one_way_ticket}
                    onChange={e => updateFields({one_way_ticket: e.target.checked})}
                />

            </FormWrapper>
        </>
    );
}