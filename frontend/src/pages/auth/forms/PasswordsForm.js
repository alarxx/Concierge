import React, {useEffect, useState} from 'react';

import FormWrapper from "../../../components/form/FormWrapper";

import People from '../../../assets/icons/people.svg';
import Profile from '../../../assets/icons/profile.svg';
import InputForm from "../../../components/form/InputForm";

export default function PasswordsForm({password, updateFields=f=>f }){
    return (
        <FormWrapper title={"Последняя деталь"}>

            <InputForm label={"Password *"} placeHolder={"Введите пароль"}
                       updateFields={updateFields} field_key={"password"} value={password}
            />

        </FormWrapper>
    );
}