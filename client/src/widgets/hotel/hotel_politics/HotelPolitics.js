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


export default function HotelPolitics({ hotel }) {


    return(<>
        <Card variant={'info'} top={12} bottom={12}>
            <Typography size={18} weight={700} bottom={8} >Политика отеля</Typography>

            <ListDetails Icon={<AlarmIcon/>}>
                <Typography size={16} weight={700}>Заезд: </Typography><Typography size={16} weight={500}>с 10:00 </Typography><Typography size={16} weight={700}>Выезд: </Typography><Typography size={16} weight={500}>с 08:00 </Typography>
            </ListDetails>

            <ListDetails Icon={<MealsIcon/>} >
                <Typography size={16} weight={700}>Тип питания: </Typography><Typography size={16} weight={500}>На базе завтраков</Typography>
            </ListDetails>

            <ListDetails Icon={<PetsIcon/>} title={'Животные:'}>
                <Typography size={16} weight={500}>Животные разрешены с доплатой. Цену за проживания сможете уточнить у менеджера.</Typography>
            </ListDetails>

            <ListDetails Icon={<GeneralIcon/>} title={'Политика отмены: '}>
                {/*<Typography size={16} weight={500}>Отмена брони возможна с доплатой. Цена за отмену брони: % от суммы брони.</Typography>*/}
                <Typography size={16} weight={500}>Отмена брони возможна с доплатой. Уточняйте у менеджера.</Typography>
            </ListDetails>
        </Card>
    </>)
}