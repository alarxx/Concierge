import React, {useEffect, useMemo, useState} from 'react';

import {useLocation, useNavigate} from "react-router-dom";

import DatePicker from "react-datepicker";
import './datepicker.css'

import Select, {components} from 'react-select'
import Input from '../../../shared/ui/input/Input';
import Button from '../../../shared/ui/button/Button';
import GroupInput from "../../../shared/ui/group_input/GroupInput";

import MyInput from './_MyInput'
import Logger from "../../../internal/Logger";
// import Select from "../../../shared/ui/select/Select";

export default function NewHotelOrder({ data={}, cities=[], upsertFields=f=>f }){
    const logger = useMemo(()=>new Logger('NewHotelOrder'), [])
    const navigate = useNavigate();

    function submit_findHotels(e){
        e.preventDefault();
        return navigate('/new/hotel', { replace: false, state: { data } })
    }

    const DropdownIndicator = (props) => {
        return (
            components.DropdownIndicator && (
                <components.DropdownIndicator {...props}>
                    <SearchIcon />
                </components.DropdownIndicator>
            )
        )
    }

    const SearchIcon = () => (
        <svg
            width="22"
            height="22"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="38" cy="40" r="20.5" stroke="currentColor" strokeWidth="7" />
            <path
                d="M76.0872 84.4699C78.056 86.4061 81.2217 86.3797 83.158 84.4109C85.0943 82.442 85.0679 79.2763 83.099 77.34L76.0872 84.4699ZM50.4199 59.2273L76.0872 84.4699L83.099 77.34L57.4317 52.0974L50.4199 59.2273Z"
                fill="currentColor"
            />
        </svg>
    )

    const [inputText, setInputText] = useState('')

    const handleInputChange = (inputText, meta) => {
        if (meta.action !== 'input-blur' && meta.action !== 'menu-close') {
            setInputText(inputText)
        }
    }

    const [cityOptions, setCityOptions] = useState([]);
    useEffect(()=>{
        const c = cities.map(obj => ({label: obj.name, value: obj.name,}));
        logger.log({cities, cityOptions: c});
        setCityOptions(c);
    },[cities])

    const [selectOption, setSelectOption] = useState(null)

    const handleOnSelect = (e) => {
        setSelectOption(e.value)
    }

    useEffect(()=>{
        upsertFields({city: selectOption});
        console.log(selectOption)
    }, [selectOption])

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <div className="">
            <form onSubmit={submit_findHotels}>
                <label>Город</label>
                <Select
                    placeholder={'Введите город'}
                    options={cityOptions}
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            border: '1px solid rgba(30, 38, 47, 0.06)',
                            boxShadow: '2px 4px 4px rgba(30, 38, 47, 0.02)',
                            borderRadius: 16,
                            padding: '8px 8px',
                            fontSize: '14px',
                            color: '#a3a1a1',
                            marginBottom: '10px',
                        }),
                        clearIndicator: (base) => ({
                            ...base,
                            position: 'absolute',
                            right: 0,
                        }),
                    }}
                    name={'city'}
                    components={{
                        // …
                        DropdownIndicator,
                        IndicatorSeparator: () => null,
                    }}
                    value={cityOptions.find(obj => obj.value === selectOption)}
                    inputValue={inputText}
                    onInputChange={handleInputChange}
                    onChange={handleOnSelect}
                    required
                />
                <label>Даты проживания</label>
                <GroupInput>
                    {/*<DatePicker*/}
                    {/*    selected={startDate}*/}
                    {/*    onChange={(date) => setStartDate(date)}*/}
                    {/*    monthsShown={2}*/}
                    {/*/>*/}
                    {/*<DatePicker*/}
                    {/*    selected={endDate}*/}
                    {/*    onChange={(date) => setEndDate(date)}*/}
                    {/*    selectsEnd*/}
                    {/*    startDate={startDate}*/}
                    {/*    endDate={endDate}*/}
                    {/*    minDate={startDate}*/}
                    {/*/>*/}
                    <MyInput placeHolder='Дата заезда' type='date' name='start_date' data={data} upsertFields={upsertFields} />
                    <MyInput placeHolder='Дата выезда' type='date' name='end_date' data={data} upsertFields={upsertFields} />
                </GroupInput>

                <label>Количество взрослых</label>
                <MyInput placeHolder='1 Номер для' type='number' name='number_of_adults' data={data} upsertFields={upsertFields} />

                <label>Количество детей</label>
                <MyInput placeHolder='Дети' type='number' name='number_of_children' data={data} upsertFields={upsertFields} />

                <Button type={'submit'}>Поиск отеля</Button>
            </form>
        </div>
    );
}

