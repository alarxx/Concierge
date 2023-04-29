import React from 'react'
import Card from "../../shared/ui/card/Card";
import CardHeader from "../../shared/ui/card/CardHeader";
import CardBody from "../../shared/ui/card/CardBody";
import CardFooter from "../../shared/ui/card/CardFooter";
import Typography from "../../shared/ui/typography/Typography";
import GroupFlex from "../../shared/ui/group_flex/GroupFlex";
import ButtonLike from "../../shared/ui/button_like/ButtonLike";
import Button from "../../shared/ui/button/Button";


export default function HotelChoiceRoom({countOfRooms='',rangePrice='', previews=[]}) {


    return(<>
        <Card>
            <GroupFlex>
                <div>
                    <CardHeader>
                        <Typography size={18} weight={700} bottom={4}>Комнаты ({countOfRooms})</Typography>
                    </CardHeader>
                    <div>
                        <Typography size={16} weight={500}>{rangePrice}</Typography>
                    </div>
                </div>
                <Button variant={'second'} onClick={f=>f}>Выбрать комнату</Button>
            </GroupFlex>
            <CardBody>
                previews
            </CardBody>
        </Card>
    </>)
}