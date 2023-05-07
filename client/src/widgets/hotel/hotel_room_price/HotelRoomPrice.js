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
import TextBoxOutlined from "../../../shared/ui/text_box_outlined/TextBoxOutlined";


export default function HotelRoomPrice({}) {


    return(<>
        <Card variant={'info'} top={12} bottom={12}>
            <GroupFlex justify={'jcsb'} align={'ais'}>
                <Typography size={18} weight={700} bottom={8}>Цена</Typography>
                <div>
                    <div><Typography size={20} weight={800}>100,000 - 112,000 KZT</Typography></div>
                    <div><Typography size={16} weight={500}>на  2 взр.  с 22.04. по 24.04</Typography></div>
                </div>
            </GroupFlex>

            <TextBoxOutlined
                text={'В силу политики конфиденциальности мы не можем показывать точную стоимость номеров до отправления заявки.  Отправьте заявку и наш менеджер полностью засчитает стоимость вашей брони'}
                top={25}
                bottom={30}
            />

            <ListDetails Icon={<GeneralIcon/>} title={'Включено:'}>
                <ul>
                    <ListDetailsItem text={'Питание типа “Все включено”'}/>
                    <ListDetailsItem text={'СПА'}/>
                    <ListDetailsItem text={'Экскурсия по отелю'}/>
                    <ListDetailsItem text={'Wi-Fi'}/>
                    <ListDetailsItem text={'Доступ в VIP зону'}/>
                </ul>
            </ListDetails>

            <ListDetails Icon={<GeneralIcon/>} title={'НЕ включено:'}>
                <ul>
                    <ListDetailsItem text={'Напитки в холодильниках'}/>
                    <ListDetailsItem text={'Посещение ресторанов и баров'}/>
                    <ListDetailsItem text={'Поседение массажа'}/>
                </ul>
            </ListDetails>
        </Card>
    </>)
}