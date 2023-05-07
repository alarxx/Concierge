import React from 'react'
import Card from "../../../shared/ui/card/Card";
import CardHeader from "../../../shared/ui/card/CardHeader";
import CardBody from "../../../shared/ui/card/CardBody";
import CardFooter from "../../../shared/ui/card/CardFooter";
import Typography from "../../../shared/ui/typography/Typography";
import GroupFlex from "../../../shared/ui/group_flex/GroupFlex";
import ButtonLike from "../../../shared/ui/button_like/ButtonLike";
import Button from "../../../shared/ui/button/Button";


export default function HotelGeo({address='',rangeAddress=''}) {


    return(<>
        <Card variant={'info'} top={12} bottom={12}>
            <Typography size={18} weight={700} bottom={4} >Местоположение</Typography>

            <Typography size={16} weight={500} bottom={4}>{address}</Typography>
            <Typography size={16} weight={500}>{rangeAddress}</Typography>

            <Button variant={'outline'} size={'small'} onClick={f=>f}>На карте</Button>
        </Card>
    </>)
}