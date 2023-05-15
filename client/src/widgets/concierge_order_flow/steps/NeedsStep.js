import React, {useEffect, useState} from 'react';
import Block from "../../../shared/ui/block/Block";
import Typography from "../../../shared/ui/typography/Typography";
import CheckboxService from "../../../shared/ui/checkbox_service/CheckboxService";

import HotelIcon from '../../../assets/icons/bed_icon.svg'
import TicketIcon from '../../../assets/icons/ticket_icon.svg'
import TransferIcon from '../../../assets/icons/transfer_icon.svg'
import CardBody from "../../../shared/ui/card/CardBody";
import GroupFlex from "../../../shared/ui/group_flex/GroupFlex";
import ButtonIconic from "../../../shared/ui/button_iconic/ButtonIconic";
import ArrowLeft from "../../../assets/icons/backbtn_icon.svg";
import Button from "../../../shared/ui/button/Button";
import Card from "../../../shared/ui/card/Card";
import _NavigationButtons from "../_navigation_buttons/_NavigationButtons";

export default function NeedsStep({
                                      data={},
                                      upsertFields=f=>f,

                                      next=f=>f,
                                      back=f=>f,

                                      submit=f=>f,
                                      close=f=>f,

                                      isFirstStep=false,
                                      isLastStep=false,
                              }){

    const { needs } = data;

    // получение данных из чекбоксов (CheckboxService)
    const [servicesPool, setServicesPool] = useState([]);
    const [isNotChecked, setIsNotChecked] = useState(false)

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            // Add the value to the selectedValues array
            setServicesPool([...servicesPool, value]);
            setIsNotChecked(false)
        } else {
            // Remove the value from the selectedValues array
            setServicesPool(servicesPool.filter((v) => v !== value));
        }
    };

    // можно удалить этот участок кода, тут просто проверяем servicesPool
    useEffect(()=>{
        console.log(servicesPool)
        upsertFields({needs: servicesPool})
    }, [servicesPool])
    // --

    function onSubmitHandler(e) {
        e.preventDefault();

        if (needs.length === 0) {
            setIsNotChecked(true)
            return;
        }
        if (isLastStep) {
            return submit()
        }
        return next();
    }

    return (<>
        <form onSubmit={onSubmitHandler}>
            <Card>
                <CardBody>
                    <Block isAlignCenter={true} bottom={40}>
                        <Typography size={20} weight={700} align={'center'}>Что вам может понадобиться?</Typography>
                    </Block>

                    <CheckboxService name={'needs'} value={'hotel'} Icon={<HotelIcon/>} title={'Отель'} onChange={handleCheckboxChange} bottom={12}/>
                    <CheckboxService name={'needs'} value={'ticket'} Icon={<TicketIcon/>} title={'Авиабилеты'} onChange={handleCheckboxChange} bottom={12} />
                    <CheckboxService name={'needs'} value={'transfer'} Icon={<TransferIcon/>} title={'Трансфер'} onChange={handleCheckboxChange}/>

                    { isNotChecked &&
                        <Block top={15}>
                            <Typography color={'#d21616'}>(!) Выберите хотя бы один из пунктов</Typography>
                        </Block>
                    }

                    {/*<input type={'text'} value={needs?needs:''} onChange={e => upsertFields({ needs: e.target.value}) }/>*/}
                </CardBody>
            </Card>
            <_NavigationButtons isLastStep={isLastStep} isFirstStep={isFirstStep} back={back}/>
        </form>
    </>);
}