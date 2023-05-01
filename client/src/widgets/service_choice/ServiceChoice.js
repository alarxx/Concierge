import React, {useEffect, useState} from "react";

import Card from "../../shared/ui/card/Card";
import CardHeader from "../../shared/ui/card/CardHeader";
import Logo from "../../shared/ui/logo/Logo";
import CardBody from "../../shared/ui/card/CardBody";
import NewHotelOrder from "../../entities/order/new_hotel_order/NewHotelOrder";
import NewTransferOrder from "../../entities/order/new_transfer_order/NewTransferOrder";
import Button from "../../shared/ui/button/Button";
import GroupFlex from "../../shared/ui/group_flex/GroupFlex";

export default function ServiceChoice() {

    const [activeEl, setActiveEl] = useState(<NewHotelOrder />)

    return (<>
        <GroupFlex>
            <Button onClick={()=> setActiveEl(<NewHotelOrder />)}>отель</Button>
            <Button onClick={()=> setActiveEl(<NewTransferOrder />)}>трансфер</Button>
            <Button onClick={()=> setActiveEl(null)}>билеты</Button>
        </GroupFlex>

        <Card>
            <CardHeader>
                <Logo />
            </CardHeader>

            <CardBody>
                {activeEl}
            </CardBody>
        </Card>
    </>)
}