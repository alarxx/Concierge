import React from 'react'
import Card from "../../../shared/ui/card/Card";
import CardHeader from "../../../shared/ui/card/CardHeader";
import CardBody from "../../../shared/ui/card/CardBody";
import CardFooter from "../../../shared/ui/card/CardFooter";
import Typography from "../../../shared/ui/typography/Typography";
import GroupFlex from "../../../shared/ui/group_flex/GroupFlex";
import ButtonLike from "../../../shared/ui/button_like/ButtonLike";
import Button from "../../../shared/ui/button/Button";
import ListDetails from "../../../shared/ui/list_details/ListDetails";

import GeneralIcon from "../../../assets/icons/details_icon.svg";
import ListDetailsItem from "../../../shared/ui/list_details/ListDetailsItem";


export default function HotelDetails({}) {


    return(<>
        <Card variant={'info'} top={12} bottom={12}>
            <Typography size={18} weight={700} bottom={8} >Услуги и возможности</Typography>

            <ListDetails Icon={<GeneralIcon/>} title={'Общие:'}>
                <ul>
                    <ListDetailsItem text={'Кондиционеры'}/>
                    <ListDetailsItem text={'Лифты'}/>
                    <ListDetailsItem text={'Будки для курения'}/>
                    <ListDetailsItem text={'Ресепшен'}/>
                </ul>
            </ListDetails>

            <ListDetails Icon={<GeneralIcon/>} title={'Питание:'}>
                <ul>
                    <ListDetailsItem text={'Кофе и чай для гостей'}/>
                    <ListDetailsItem text={'Завтрак'}/>
                    <ListDetailsItem text={'Полдник'}/>
                    <ListDetailsItem text={'Обед'}/>
                    <ListDetailsItem text={'Кофе-брейк'}/>
                    <ListDetailsItem text={'Ужин'}/>
                </ul>
            </ListDetails>
        </Card>
    </>)
}