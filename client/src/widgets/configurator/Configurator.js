import React from "react";
import GroupFlex from "../../shared/ui/group_flex/GroupFlex";
import HotelCard from "../hotel_card/HotelCard";
import ButtonPlus from "../../shared/ui/button_plus/ButtonPlus";

export default function Configurator(){




    return (<>
        <GroupFlex wrap={true}>
            <HotelCard title={'Hilton'} price={'от 50,000 KZT '} addInfo={'2 взрослых, 2 ночи'} />
            <HotelCard title={'Hilton'} price={'от 50,000 KZT '} addInfo={'2 взрослых, 2 ночи'} />
            <ButtonPlus />
        </GroupFlex>
    </>)
}