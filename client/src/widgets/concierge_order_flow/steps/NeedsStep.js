import React, {useEffect, useState} from 'react';
import Block from "../../../shared/ui/block/Block";
import Typography from "../../../shared/ui/typography/Typography";
import CheckboxService from "../../../shared/ui/checkbox_service/CheckboxService";

import HotelIcon from '../../../assets/icons/bed_icon.svg'
import TicketIcon from '../../../assets/icons/ticket_icon.svg'
import TransferIcon from '../../../assets/icons/transfer_icon.svg'
import CardBody from "../../../shared/ui/card/CardBody";
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
    const [isNotValid, setIsNotValid] = useState(false);

    useEffect(()=> {
        if (needs) {
            setServicesPool(needs);
        }
    }, [])

    useEffect(()=>{
        console.log('servicesPool', servicesPool);
        upsertFields({needs: servicesPool});
    }, [servicesPool])


    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            // Add the value to the selectedValues array
            setServicesPool([...servicesPool, value]);
            setIsNotValid(false)
        } else {
            // Remove the value from the selectedValues array
            setServicesPool(servicesPool.filter((v) => v !== value));
        }
    };

    function onSubmitHandler(e) {
        e.preventDefault();

        if (servicesPool.length === 0) {
            setIsNotValid(true)
            return;
        }
        if (isLastStep) {
            return submit();
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

                    <CheckboxService isChecked={needs && needs.includes('hotel')} name={'needs'} value={'hotel'} Icon={<HotelIcon/>} title={'Отель'} onChange={handleCheckboxChange} bottom={12}/>
                    <CheckboxService isChecked={needs && needs.includes('airfare')} name={'needs'} value={'airfare'} Icon={<TicketIcon/>} title={'Авиабилеты'} onChange={handleCheckboxChange} bottom={12} />
                    <CheckboxService isChecked={needs && needs.includes('transfer')} name={'needs'} value={'transfer'} Icon={<TransferIcon/>} title={'Трансфер'} onChange={handleCheckboxChange}/>

                    { isNotValid &&
                        <Block top={15}>
                            <Typography color={'#d21616'}>(!) Выберите хотя бы один из пунктов</Typography>
                        </Block>
                    }

                    {/*<input type={'text'} value={needs?needs:''} onChange={e => upsertFields({ needs: e.target.value}) }/>*/}
                </CardBody>
                <_NavigationButtons isLastStep={isLastStep} isFirstStep={isFirstStep} back={back}/>
            </Card>
        </form>
    </>);
}