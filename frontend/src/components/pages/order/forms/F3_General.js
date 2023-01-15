import React from 'react';
import FormWrapper from "../../../formComponents/FormWrapper";
import ServiceItem from "../../../formComponents/ServiceItem";

import HouseSVG from "../../../../icons/house.svg";
import InputForm from "../../../formComponents/InputForm";
import SelectForm from "../../../formComponents/SelectForm";

export default function F1({updateFields=f=>f}){
    return (
        <>
            <FormWrapper title={"Заполните данные о командировке для расчета стоимости"}>
                <InputForm label={"Количество людей *"}/>
                <SelectForm label={"Место отправления *"}/>
                <SelectForm label={"Место прибытия *"}/>
            </FormWrapper>
        </>
    );
}
