import React, {useState} from 'react';
import FormWrapper from "../../../components/form/FormWrapper";

import InputForm from "../../../components/form/InputForm";

export default function F9_OrderName({name, updateFields=f=>f}){
    return (
        <>
            <FormWrapper title={"Название для услуги"}>
                <InputForm
                    placeHolder={"Как вы хотите назвать услугу?"}
                    updateFields={updateFields}
                    field_key={"name"}
                    value={name}
                />
            </FormWrapper>
        </>
    );
}
