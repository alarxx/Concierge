import React, {forwardRef, useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import monthName from '../../internal/monthName'

import styles from './rangeDatepicker.module.css';
import './datepicker.css';
import {useAppContext} from "../../context/AppContext";


// const CustomInput = ({ value, onClick, onChange }) => {
//     return (<>
//         <input value={value} onChange={onChange} onClick={onClick} />
//         <input value={value} onChange={onChange} onClick={onClick}  />
//     </>)
// }
export default function RangeDatepicker({onChangeDates=f=>f}) {

    // const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState();

    const {adaptiveHandler} = useAppContext();
    const { device } = adaptiveHandler;

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    useEffect(() => {
        onChangeDates(dateRange)
    }, [dateRange])


    const CustomInput = forwardRef(({ value, onClick, onChange }, ref) => {

        const startDateFormatted = startDate ? `${startDate.getDate()} ${monthName(startDate.getMonth())}, ${startDate.getFullYear()}` : '';
        const endDateFormatted = endDate ? `${endDate.getDate()} ${monthName(endDate.getMonth())}, ${endDate.getFullYear()}` : '';

        return (
            <div className={styles['range_datepicker-input__wrapper']}>
                <input placeholder={'Дата заезда'} className={styles['range_datepicker-input']} value={startDateFormatted} onChange={onChange} onClick={onClick} ref={ref} />
                <input placeholder={'Дата выезда'} className={styles['range_datepicker-input']} value={endDateFormatted} onChange={onChange} onClick={onClick} ref={ref}  />
            </div>
        )
    });

    return (
        <div className={styles['range_datepicker-wrapper']}>
            <DatePicker
                className={styles['range_datepicker-input']}
                minDate={new Date()}
                selectsRange={true}
                selectsStart
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                    setDateRange(update);
                }}
                showNextMonths
                monthsShown={2}
                showPopperArrow={false}
                showDisabledMonthNavigation
                withPortal={device === 'mobile'}
                // dateFormat="d, MMMM, yyyy"
                required
                customInput={<CustomInput />}
            />
            {/*<DatePicker*/}
            {/*    className={styles['range_datepicker-input']}*/}
            {/*    // excludeDates={[new Date()]}*/}
            {/*    // selectsRange={true}*/}
            {/*    // minDate={new Date()}*/}
            {/*    selectsStart*/}
            {/*    selected={startDate}*/}
            {/*    startDate={startDate}*/}
            {/*    endDate={endDate}*/}
            {/*    monthsShown={2}*/}
            {/*    dateFormat="d, MMMM, yyyy"*/}
            {/*    showPopperArrow={false}*/}
            {/*    onChange={(date) => setStartDate(date)}*/}
            {/*    shouldCloseOnSelect={false}*/}
            {/*    // customInput={<ExampleCustomInput />}*/}
            {/*    required*/}
            {/*/>*/}
            {/*<DatePicker*/}
            {/*    className={styles['range_datepicker-input']}*/}
            {/*    minDate={new Date()}*/}
            {/*    selectsEnd*/}
            {/*    selected={endDate}*/}
            {/*    startDate={startDate}*/}
            {/*    endDate={endDate}*/}
            {/*    monthsShown={2}*/}
            {/*    dateFormat="d MMMM, yyyy"*/}
            {/*    showPopperArrow={false}*/}
            {/*    onChange={(date) => setEndDate(date)}*/}
            {/*    shouldCloseOnSelect={false}*/}
            {/*    required*/}
            {/*/>*/}
        </div>
    )
}