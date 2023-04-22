import React, {useEffect, useState} from 'react';

import InputForm from "../../../ui/input/Input";

export default function PasswordsForm({password, password_confirmation, updateFields=f=>f }){
    return (
        <>
            <div>Последняя деталь</div>

            <InputForm type="password" required={true} label={"Password *"} placeHolder={"Введите пароль"}
                       updateFields={updateFields} field_key={"password"} value={password}
            />
            <InputForm type="password" required={true} placeHolder={"Введите пароль повторно"}
                       updateFields={updateFields} field_key={"password_confirmation"} value={password_confirmation}
            />

        </>
    );
}