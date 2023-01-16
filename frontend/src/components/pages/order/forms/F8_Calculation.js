import React, {useState} from 'react';
import FormWrapper from "../../../form/FormWrapper";
import CalculationResult from "../../../form/CalculationResult";

export default function F8_Calculation({updateFields=f=>f}){
    return (
        <>
            <FormWrapper title={"Найдено 34 подходящих отелей"} undertitle={"Можете выбрать несколько вариантов"}>
                <CalculationResult />
            </FormWrapper>
        </>
    );
}
