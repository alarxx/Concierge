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


export default function HotelRoomDetails({}) {


    return(<>
        <Card variant={'info'} top={12} bottom={12}>
            <Typography size={18} weight={700} bottom={8} >В номере</Typography>

            <ListDetails Icon={<GeneralIcon/>} title={'Общее:'}>
                <ul>
                    <ListDetailsItem text={'Кондиционер'}/>
                    <ListDetailsItem text={'Одна 2-х мест. кровать'}/>
                    <ListDetailsItem text={'Комод'}/>
                    <ListDetailsItem text={'Ванная'}/>
                    <ListDetailsItem text={'Телевизор'}/>
                    <ListDetailsItem text={'Балкон'}/>
                    <ListDetailsItem text={'Холодильник'}/>
                </ul>
            </ListDetails>

            <ListDetails Icon={<GeneralIcon/>} title={'Ванная:'}>
                <ul>
                    <ListDetailsItem text={'Душ'}/>
                    <ListDetailsItem text={'Фен'}/>
                    <ListDetailsItem text={'Халат'}/>
                    <ListDetailsItem text={'Тапочки'}/>
                    <ListDetailsItem text={'Попотенца'}/>
                    <ListDetailsItem text={'Шампунь'}/>
                </ul>
            </ListDetails>

            <ListDetails Icon={<GeneralIcon/>} title={'Правила:'}>
                <ul>
                    <ListDetailsItem text={'Тишина после 12:00'}/>
                    <ListDetailsItem text={'Курение разрешено'}/>
                    <ListDetailsItem text={'Спиртное разрешено'}/>
                </ul>
            </ListDetails>
        </Card>
    </>)
}