import React, {useEffect, useMemo} from 'react'
import Card from "../../../shared/ui/card/Card";
import CardServiceHeader from "../../../shared/ui/card_service/CardServiceHeader";
import CardServiceBody from "../../../shared/ui/card_service/CardServiceBody";
import CardServiceFooter from "../../../shared/ui/card_service/CardServiceFooter";
import Typography from "../../../shared/ui/typography/Typography";
import GroupFlex from "../../../shared/ui/group_flex/GroupFlex";
import ButtonLike from "../../../shared/ui/button_like/ButtonLike";
import CardService from "../../../shared/ui/card_service/CardService";
import Gallery from "../../../shared/ui/gallery/Gallery";
import Stars from "../../../shared/ui/stars/Stars";
import Chip from "../../../shared/ui/chip/Chip";
import CardHeader from "../../../shared/ui/card/CardHeader";
import CardBody from "../../../shared/ui/card/CardBody";
import Logger from "../../../internal/Logger";

const statusEnum = ({
    new: { text:'новый', variant: 'green' },
    handling: { text:'В обработке', variant: 'blue' },
});

export default function OrderCard({ order={}, onClick=f=>f }) {
    const logger = useMemo(()=>new Logger('OrderCard'), [])

    const status = statusEnum[order.status];

    useEffect(()=>{
        logger.log({ order });
    }, [])

    return(<>
        <CardService onClick={onClick}>

            <CardBody>
                <GroupFlex align={'ais'} justify={'jcsb'}>
                    <div>
                        <div><Typography size={16} weight={600} bottom={2}>Астана, Hilton</Typography></div>
                        <div> <Typography size={16} weight={600} bottom={4} color={'#959BA1'}>Заказ #6723</Typography></div>
                    </div>
                    <Chip text={status.text} variant={status.variant} />
                </GroupFlex>
            </CardBody>

            <CardBody>
                <div>
                    <Typography size={14} weight={500} bottom={2}>22 апр - 24 апр - 2 взрослых</Typography>
                </div>
                <div>
                    <Typography size={14} weight={500} bottom={2} color={'#959BA1'}>Lux на 2, № 1 - Питание: BB</Typography>
                </div>
            </CardBody>

        </CardService>
    </>)
}