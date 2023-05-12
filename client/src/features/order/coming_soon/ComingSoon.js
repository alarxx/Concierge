import React from "react";

import Typography from "../../../shared/ui/typography/Typography";
import GroupButtons from "../../../shared/ui/group_buttons/GroupButtons";
import Button from "../../../shared/ui/button/Button";
import Block from "../../../shared/ui/block/Block";

export default function ComingSoon({cancelClick=f=>f}) {

    return(<>
        <Block isAlignCenter={true}>
            <Typography weight={700} size={24} bottom={12}>Функция в разработке</Typography>
            <Typography weight={500} size={16} color={'#65727D'} align={'center'}>Мы прилагаем все усилия, чтобы сделать ее доступной в ближайшее время.</Typography>
        </Block>

        <GroupButtons top={40}>
            <Button onClick={cancelClick}>Понятно</Button>
        </GroupButtons>
    </>)
}