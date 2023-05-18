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

import AlarmIcon from '../../../assets/icons/alarm_icon.svg'
import MealsIcon from '../../../assets/icons/meals_icon.svg'
import PetsIcon from '../../../assets/icons/pets-icon.svg'
import GeneralIcon from '../../../assets/icons/details_icon.svg'
import HotelIcon from '../../../assets/icons/hotel_icon.svg'
import PersonalIcon from '../../../assets/icons/personal_icon.svg'
import Stars from "../../../shared/ui/stars/Stars";


export default function HotelOrderDetails({hotel, data}) {


    return(<>
        <Card variant={'info'} top={12} bottom={12}>
            <Typography size={18} weight={700} bottom={8} >Заказ</Typography>

            <ListDetails Icon={<HotelIcon/>} title={'Отель:'}>
                <div><Typography size={16} weight={700}>{hotel.name}</Typography> <Stars/></div>
                {/*<div><Typography size={16} weight={500}>Адрес: Sauran St 46, Astana, Kazakhstan </Typography></div>*/}
                <div><Typography size={16} weight={500}>{hotel.city}</Typography></div>
            </ListDetails>

            {/*<ListDetails Icon={<HotelIcon/>} title={'Комната:'}>*/}
            {/*    <div><Typography size={16} weight={700}>LUX на 2, № 1</Typography></div>*/}
            {/*    <div><Typography size={16} weight={500}>Одна 2-х мест.кровать, диван, балкон</Typography></div>*/}
            {/*</ListDetails>*/}

            <ListDetails Icon={<PersonalIcon/>} title={'Бронь на:'}>
                <div><Typography size={16} weight={500}>Люди: </Typography> <Typography size={16} weight={700}>{data.number_of_adults} взрослых</Typography> </div>
                <div><Typography size={16} weight={500}>Период: </Typography> <Typography size={16} weight={700}>с {} по {}</Typography> </div>
            </ListDetails>

            <ListDetails Icon={<MealsIcon/>} title={'Питание:'} >
                <Typography size={16} weight={700}>Тип питания: </Typography><Typography size={16} weight={500}>На базе завтраков</Typography>
            </ListDetails>

        </Card>
    </>)
}