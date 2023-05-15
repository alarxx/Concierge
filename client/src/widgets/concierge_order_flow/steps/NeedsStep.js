import React, {useEffect, useState} from 'react';
import Block from "../../../shared/ui/block/Block";
import Typography from "../../../shared/ui/typography/Typography";
import CheckboxService from "../../../shared/ui/checkbox_service/CheckboxService";

import HotelIcon from '../../../assets/icons/bed_icon.svg'
import TicketIcon from '../../../assets/icons/ticket_icon.svg'
import TransferIcon from '../../../assets/icons/transfer_icon.svg'

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
    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            // Add the value to the selectedValues array
            setServicesPool([...servicesPool, value]);
        } else {
            // Remove the value from the selectedValues array
            setServicesPool(servicesPool.filter((v) => v !== value));
        }
    };

    // можно удалить этот участок кода, тут просто проверяем servicesPool
    useEffect(()=>{
        console.log(servicesPool)
    }, [servicesPool])
    // --

    
    return (<>
        <Block isAlignCenter={true} bottom={40}>
            <Typography size={20} weight={700} align={'center'}>Что вам может понадобиться?</Typography>
        </Block>

        <CheckboxService value={'hotel'} Icon={<HotelIcon/>} title={'Отель'} onChange={handleCheckboxChange} bottom={12}/>
        <CheckboxService value={'ticket'} Icon={<TicketIcon/>} title={'Авиабилеты'} onChange={handleCheckboxChange} bottom={12} />
        <CheckboxService value={'transfer'} Icon={<TransferIcon/>} title={'Трансфер'} onChange={handleCheckboxChange}/>
        {/*<input type={'text'} value={needs?needs:''} onChange={e => upsertFields({ needs: e.target.value}) }/>*/}
    </>);
}