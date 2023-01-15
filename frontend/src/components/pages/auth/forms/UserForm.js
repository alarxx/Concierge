import React from 'react';
import InputForm from "../../../formComponents/InputForm";
import FormWrapper from "../../../formComponents/FormWrapper";

export default function UserForm({ }){
        return (
            <FormWrapper title={"Последняя деталь"}>
                <InputForm label={"ФИО *"} placeHolder={"Введите ваше полное имя"}/>
                <InputForm label={"Название комании *"} placeHolder={"Введите название компании"}/>
                <InputForm label={"Моб. телефон *"} placeHolder={"+7   (7 _ _)   _ _ _    _ _    _ _"}/>
                <InputForm label={"Электронная почта *"} placeHolder={"Введите вашу эл. почту"}/>
            </FormWrapper>
        );
}