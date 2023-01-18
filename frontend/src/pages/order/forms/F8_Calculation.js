import React, {useState} from 'react';
import FormWrapper from "../../../components/form/FormWrapper";
import CalculationResult from "../../../components/form/CalculationResult";

export default function F8_Calculation({updateFields=f=>f}){
    return (
        <>
            <FormWrapper title={"Готово!"}>
                <CalculationResult />
            </FormWrapper>
        </>
    );
}
