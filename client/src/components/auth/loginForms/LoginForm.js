import React from 'react';
import InputForm from "../../../ui/input/Input";

export default function LoginForm({email, password, updateFields=f=>f }){
        return (
            <>
                <div>Войти в аккаунт</div>

                <InputForm
                    type={"email"}
                    required={true}
                    label={"Электронная почта *"}
                    placeHolder={"Введите вашу эл. почту"}
                    updateFields={updateFields}
                    field_key={"email"}
                    value={email}
                />
                 <InputForm
                     type={"password"}
                     required={true}
                     label={"Password *"}
                     placeHolder={"Введите пароль"}
                     updateFields={updateFields}
                     field_key={"password"}
                     value={password}
                 />
            </>
        );
}