import React, {useState} from "react";

import Typography from "../../../shared/ui/typography/Typography";
import Button from "../../../shared/ui/button/Button";
import Block from "../../../shared/ui/block/Block";
import Input from "../../../shared/ui/input/Input";
import GroupInput from "../../../shared/ui/group_input/GroupInput";
import GroupButtons from "../../../shared/ui/group_buttons/GroupButtons";
import Modal from "../../../shared/ui/modal/Modal";
import Accordion from "../../../shared/ui/accordion/Accordion";
import AccordionSummary from "../../../shared/ui/accordion/AccordionSummary";
import Card from "../../../shared/ui/card/Card";
import CardBody from "../../../shared/ui/card/CardBody";
import GroupFlex from "../../../shared/ui/group_flex/GroupFlex";
import TriangleIcon from "../../../assets/icons/arrow-down.svg";
import AccordionDetails from "../../../shared/ui/accordion/AccordionDetails";
import SendResetPasswordMail from "../../auth/password_send_reset/SendResetPasswordMail";
import RoomList from "../../../widgets/hotel/room_list/RoomList";

export default function HotelRoomForm({title='', onClose, item}) {

    function onSubmit() {
        console.log('room create submit')
    }

    const [expanded, setExpanded] = useState(null);

    function handleChange(panel) {
        if (expanded === panel) {
            setExpanded(null)
        } else {
            setExpanded(panel)
        }
    }

    return(<>


        <Modal minWidth={720} maxWidth={1000} height={'80%'} onClose={onClose}>

            <Block bottom={40} isAlignCenter={true}>
                <Typography weight={700} size={24}>{title}</Typography>
            </Block>

            <Block bottom={20}>
                <RoomList />
            </Block>

            <Accordion expanded={expanded === 'room-create'}>
                <AccordionSummary onClick={() => handleChange('room-create')} >
                    <Card variant='info'>
                        <CardBody>
                            <GroupFlex align='aic' justify='jcsb'>
                                Добавить номер
                                <TriangleIcon/>
                            </GroupFlex>
                        </CardBody>
                    </Card>
                </AccordionSummary>

                {expanded === 'room-create' &&
                    <AccordionDetails>
                        <form>
                            <Block>
                                <Typography weight={600} size={18}>Общее</Typography>
                                <GroupInput>
                                    <Input
                                        type={'text'}
                                        name={'name'}
                                        value={item ? item.name : ''}
                                        placeHolder={'Название *'}
                                        onChange={f=>f}
                                        required
                                    />
                                    <Input
                                        type={'number'}
                                        name={'stars'}
                                        value={''}
                                        placeHolder={'Категория *'}
                                        onChange={f=>f}
                                        required
                                    />
                                </GroupInput>
                            </Block>

                            <Block top={20}>
                                <Typography weight={600} size={18}>Услуги</Typography>
                                <Input
                                    type={'text'}
                                    name={'name'}
                                    value={''}
                                    placeHolder={'Услуги'}
                                    onChange={f=>f}
                                    required
                                />
                            </Block>


                            <Block top={20}>
                                <Typography weight={600} size={18}>Цена</Typography>
                                <GroupInput>
                                    <Input
                                        type={'number'}
                                        name={'name'}
                                        value={''}
                                        placeHolder={'Цена за день, KZT'}
                                        onChange={f=>f}
                                        required
                                    />
                                    <Input
                                        type={'number'}
                                        name={'stars'}
                                        value={''}
                                        placeHolder={'Cегмент'}
                                        onChange={f=>f}
                                        required
                                    />
                                </GroupInput>
                            </Block>


                            <GroupButtons top={20}>
                                <Button type={'submit'} onClick={onSubmit}>Добавить</Button>
                                <Button variant={'cancel'} onClick={() => handleChange('room-create')}>Отмена</Button>
                            </GroupButtons>
                        </form>
                    </AccordionDetails>
                }
            </Accordion>

        </Modal>
    </>)
}