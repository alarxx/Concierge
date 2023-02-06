import React from 'react';
import InputForm from "../../../components/form/InputForm";
import FormWrapper from "../../../components/form/FormWrapper";

export default function LoginForm({email, password, updateFields=f=>f }){
        return (
            <FormWrapper title={"Войти в аккаунт"}>

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

            </FormWrapper>
        );
}