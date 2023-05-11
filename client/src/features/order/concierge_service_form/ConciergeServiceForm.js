import React from "react";
import Typography from "../../../shared/ui/typography/Typography";
import CardServiceBody from "../../../shared/ui/card_service/CardServiceBody";
import GroupButtons from "../../../shared/ui/group_buttons/GroupButtons";
import Button from "../../../shared/ui/button/Button";
import Block from "../../../shared/ui/block/Block";

export default function ConciergeServiceForm({positiveClick =f=>f, cancelClick=f=>f}) {

    return(<>
        <Block isAlignCenter={true}>
            <Typography weight={700} size={24} bottom={12}>Услуги менеджера</Typography>
            <Typography weight={500} size={16} color={'#65727D'} align={'center'}>Мы можем помочь вам найти вам идеальный вариант согласно вашим запросам</Typography>
        </Block>

        <GroupButtons top={40}>
            <Button onClick={positiveClick}>Воспользоваться услугами менеджера</Button>
            <Button onClick={cancelClick}>Отмена</Button>
        </GroupButtons>
    </>)
}