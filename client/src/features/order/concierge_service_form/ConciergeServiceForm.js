import React from "react";

import Typography from "../../../shared/ui/typography/Typography";
import GroupButtons from "../../../shared/ui/group_buttons/GroupButtons";
import Button from "../../../shared/ui/button/Button";
import Block from "../../../shared/ui/block/Block";
import Modal from "../../../shared/ui/modal/Modal";

export default function ConciergeServiceForm({onClose=f=>f}) {

    function positiveClick() {
        console.log('concierge action')
    }

    return(<>
        <Modal minWidth={360} maxWidth={400} onClose={onClose}>

            <Block isAlignCenter={true}>
                <Typography weight={700} size={24} bottom={12}>Услуги менеджера</Typography>
                <Typography weight={500} size={16} color={'#65727D'} align={'center'}>Мы можем помочь вам найти вам идеальный вариант согласно вашим запросам</Typography>
            </Block>

            <GroupButtons top={40}>
                <Button onClick={positiveClick}>Воспользоваться услугами менеджера</Button>
                <Button variant={'cancel'} onClick={onClose}>Отмена</Button>
            </GroupButtons>

        </Modal>
    </>)
}