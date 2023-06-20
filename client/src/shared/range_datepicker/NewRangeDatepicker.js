import React, {forwardRef, useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import monthName from '../../internal/monthName'

import styles from './rangeDatepicker.module.css';
import './datepicker.css';
import {useAppContext} from "../../context/AppContext";
import GroupInput from "../ui/group_input/GroupInput";
import GroupInline from "../ui/group_inline/GroupInline";


export default function NewRangeDatepicker({initialDateRange=[null, null], onChangeDates=f=>f}) {


    const {adaptiveHandler} = useAppContext();
    const { device } = adaptiveHandler;

    const [dateRange, setDateRange] = useState(initialDateRange);
    const [startDate, setStartDate] = useState(dateRange[0]);
    const [endDate, setEndDate] = useState(dateRange[1]);
    // const [startDate, endDate] = dateRange;

    useEffect(()=> {
        // console.log('EDN DATA', endDate)
    })

    useEffect(()=> {
        setEndDate(null)
        setDateRange([startDate, endDate])
    }, [startDate])

    useEffect(()=> {
        setDateRange([startDate, endDate])
    }, [endDate])

    useEffect(() => {
        onChangeDates(dateRange)
    }, [dateRange])


    const CustomInput = forwardRef(({ value, onClick, onChange }, ref) => {
        const startDateFormatted = startDate ? `${startDate.getDate()} ${monthName(startDate.getMonth())}, ${startDate.getFullYear()}` : '';

        return (
            <input placeholder={'Дата заезда'} className={styles['range_datepicker-input']} value={startDateFormatted} onChange={onChange} onClick={onClick} ref={ref} />
        )
    });

    const CustomInput2 = forwardRef(({ value, onClick, onChange }, ref) => {
        const endDateFormatted = endDate ? `${endDate.getDate()} ${monthName(endDate.getMonth())}, ${endDate.getFullYear()}` : '';

        return (
            <input placeholder={'Дата выезда'} className={styles['range_datepicker-input']} value={endDateFormatted} onChange={onChange} onClick={onClick} ref={ref}  />
        )
    });


    return (
        <div className={styles['range_datepicker-wrapper']}>
            <div className={`${styles['range_datepicker-input-wrapper']} ${styles['range_datepicker-input-wrapper--first']}`}>
                <DatePicker
                    minDate={new Date()}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    isClearable
                    required
                    customInput={<CustomInput />}
                    withPortal={device === 'mobile'}
                />
            </div>
            <div className={`${styles['range_datepicker-input-wrapper']} ${styles['range_datepicker-input-wrapper--last']}`}>
                <DatePicker
                    minDate={startDate || new Date()}
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    isClearable
                    required
                    selectsEnd
                    startDate={startDate} // из-за этого при clear этого поля крестик не уходит, т.к startDate != null - баг либы
                    endDate={endDate}
                    customInput={<CustomInput2 />}
                    // при открытии портала и клике за пределы него, можно кликнуть на кликабельный элемент под overlay (кнопка, например) и затриггерить событие - короче 2ая причина, из-за которой не доволен либой
                    withPortal={device === 'mobile'}
                    // 3ая причина по которой не доволен либой, в мобайл версии меняет структуру wrapper -> container (не явное поведение) - из-за чего меняются стили -> поэтому в родных стилях нужен акцент не на react-datepicker-wrapper а на ..-container (1st,2nd-child) -> и то когда исчезает wrapper не можем достучаться до 1st и 2nd даже, поэтому нужно через свои стили ловить этот контейнер
                />
            </div>
        </div>
    )
}