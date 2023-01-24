import React, {useEffect} from 'react';
import InputForm from "../../../components/form/InputForm";
import FormWrapper from "../../../components/form/FormWrapper";

export default function UserForm({entity, name, company_name, phone, email, updateFields=f=>f }){
        useEffect(()=>{
                console.log("entity", entity);
        })
        return (
            <FormWrapper title={"Последняя деталь"}>

                <InputForm
                    label={"ФИО *"}
                    placeHolder={"Введите ваше полное имя aaaaaaa"}
                    updateFields={updateFields}
                    field_key={"name"} value={name}
                />

                {entity === 'juridical' &&
                    <InputForm
                        label={"Название комании *"}
                        placeHolder={"Введите название компании"}
                        updateFields={updateFields}
                        field_key={"company_name"}
                        value={company_name}
                    />
                }

                <InputForm
                    label={"Моб. телефон *"}
                    placeHolder={"+7   (7 _ _)   _ _ _    _ _    _ _"}
                    updateFields={updateFields}
                    field_key={"phone"}
                    value={phone}
                />

                <InputForm
                    label={"Электронная почта *"}
                    placeHolder={"Введите вашу эл. почту"}
                    updateFields={updateFields}
                    field_key={"email"}
                    value={email}
                />

            </FormWrapper>
        );
}