import React, {useEffect, useMemo, useState} from 'react';

import {useLocation, useNavigate} from "react-router-dom";

import DatePicker from "react-datepicker";

import Select, {components} from 'react-select'
import Input from '../../../shared/ui/input/Input';
import Button from '../../../shared/ui/button/Button';
import GroupInput from "../../../shared/ui/group_input/GroupInput";

import MyInput from './_MyInput'
import Logger from "../../../internal/Logger";
import Iterator from "../../../shared/ui/iterator/Iterator";
import GroupFlex from "../../../shared/ui/group_flex/GroupFlex";
import Block from "../../../shared/ui/block/Block";
import RangeDatepicker from "../../../shared/range_datepicker/RangeDatepicker";
import KidsBox from "../../../shared/kids_box/KidsBox";
// import Select from "../../../shared/ui/select/Select";

export default function NewHotelOrder({ data={}, cities=[], upsertFields=f=>f }){
    const logger = useMemo(()=>new Logger('NewHotelOrder'), [])
    const navigate = useNavigate();

    function submit_findHotels(e){
        e.preventDefault();
        return navigate('/new/hotel', { replace: false, state: { data } })
    }

    useEffect(()=>{
        const obj = {};
        if(!data.number_of_adults){
            obj.number_of_adults = 1;
        }
        if(!data.number_of_children){
            obj.number_of_children = 0;
        }
        upsertFields(obj);
    },[])

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

    const [selectOption, setSelectOption] = useState(data.city);

    const handleOnSelect = (e) => {
        setSelectOption(e.value)
    }

    useEffect(()=>{
        upsertFields({city: selectOption});
        logger.log(selectOption);
    }, [selectOption])

    useEffect(()=>{
      logger.log('DATA', data)
    }, data)



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
                <RangeDatepicker initialDateRange={[new Date(data.check_in_date), new Date(data.check_out_date)]} onChangeDates={dateRange => upsertFields({check_in_date: dateRange[0], check_out_date: dateRange[1]})} />
                {/*<GroupInputDate>*/}
                {/*    /!*<MyInput placeHolder='Дата заезда' type='date' name='check_in_date' data={data} upsertFields={upsertFields}  />*!/*/}
                {/*    /!*<MyInput placeHolder='Дата выезда' type='date' name='check_out_date' data={data} upsertFields={upsertFields}  />*!/*/}
                {/*</GroupInputDate>*/}

                <GroupInput isMobile={true} isAlignStart={true}>
                    <Block width={'100%'}>
                        <label>Взрослые</label>
                        <Iterator minValue={1} value={data.number_of_adults} onChange={e => upsertFields({number_of_adults: e})}/>
                    </Block>
                    <Block width={'100%'}>
                        <label>Дети</label>
                        {/*<Iterator value={data.number_of_children} onChange={e => upsertFields({number_of_children: e})}/>*/}
                        <KidsBox onChangeKids={agesOfKids => upsertFields({ages_of_kids: agesOfKids}) } />
                    </Block>
                </GroupInput>


                <Button type={'submit'}>Поиск отеля</Button>
            </form>
        </div>
    );
}

