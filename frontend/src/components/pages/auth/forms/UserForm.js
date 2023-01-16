import React from 'react';
import InputForm from "../../../form/InputForm";
import FormWrapper from "../../../form/FormWrapper";

export default function UserForm({name, company, phone, email, updateFields=f=>f }){
        return (
            <FormWrapper title={"Последняя деталь"}>

                <InputForm label={"ФИО *"} placeHolder={"Введите ваше полное имя"}
                           updateFields={updateFields} field_key={"name"} value={name}/>

                <InputForm label={"Название комании *"} placeHolder={"Введите название компании"}
                           updateFields={updateFields} field_key={"company"} value={company}/>

                <InputForm label={"Моб. телефон *"} placeHolder={"+7   (7 _ _)   _ _ _    _ _    _ _"}
                           updateFields={updateFields} field_key={"phone"} value={phone}/>

                <InputForm label={"Электронная почта *"} placeHolder={"Введите вашу эл. почту"}
                           updateFields={updateFields} field_key={"email"} value={email}/>

            </FormWrapper>
        );
}