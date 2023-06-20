import React, {forwardRef, useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import monthName from '../../internal/monthName'

import styles from './oneDatepicker.module.css';
import './datepicker.css';
import {useAppContext} from "../../context/AppContext";


export default function OneDatepicker({isFirst=false, isLast=false, initialDate=null, onChangeDate=f=>f, placeholder=''}) {


    const {adaptiveHandler} = useAppContext();
    const { device } = adaptiveHandler;

    const [dateOne, setDateOne] = useState(initialDate);

    useEffect(() => {
        onChangeDate(dateOne)
    }, [dateOne])



    return (
        <DatePicker
            minDate={new Date()}
            selected={dateOne}
            onChange={(date) => setDateOne(date)}
            placeholderText={placeholder}
            isClearable
            className={`
                ${styles['range_datepicker-input']}
                ${isFirst && ['range_datepicker-input--first']}
                ${isLast && ['range_datepicker-input--last']}
            `}
        />
    )
}