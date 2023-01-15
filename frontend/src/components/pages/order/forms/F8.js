import React, {useState} from 'react';
import FormWrapper from "../../../formComponents/FormWrapper";
import CalculationResult from "../../../formComponents/CalculationResult";

export default function F6({}){
    return (
        <>
            <FormWrapper title={"Найдено 34 подходящих отелей"} undertitle={"Можете выбрать несколько вариантов"}>
                <CalculationResult />
            </FormWrapper>
        </>
    );
}
