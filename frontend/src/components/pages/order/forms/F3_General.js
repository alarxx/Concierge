import React from 'react';
import FormWrapper from "../../../formComponents/FormWrapper";
import ServiceItem from "../../../formComponents/ServiceItem";

import HouseSVG from "../../../../icons/house.svg";
import InputForm from "../../../formComponents/InputForm";
import SelectForm from "../../../formComponents/SelectForm";

export default function F3_General({num_of_people, departure_place, destination_place,
                                       updateFields=f=>f }){
    return (
        <>
            <FormWrapper title={"Заполните данные о командировке для расчета стоимости"}>
                <InputForm
                    label={"Количество людей *"}
                    placeHolder={"Введите ваше полное имя"}
                    updateFields={updateFields}
                    field_key={"num_of_people"}
                    value={num_of_people}
                />

                <InputForm label={"Место отправления *"}
                           placeHolder={"Введите ваше полное имя"}
                           updateFields={updateFields}
                           field_key={"departure_place"}
                           value={departure_place}
                />

                <InputForm label={"Место прибытия *"}
                           placeHolder={"Введите ваше полное имя"}
                           updateFields={updateFields}
                           field_key={"destination_place"}
                           value={destination_place}
                />
            </FormWrapper>
        </>
    );
}
