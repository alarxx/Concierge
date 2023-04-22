import React, {useEffect} from 'react';
import InputForm from "../../../ui/input/Input";

export default function UserForm({entity, name, company_name, phone, email, updateFields=f=>f }){
        useEffect(()=>{
                console.log("entity", entity);
        })
        return (
            <>
                <div>Введите ваши данные</div>

                <InputForm
                    label={"ФИО *"}
                    type="text" required={true}
                    placeHolder={"Введите ваше полное имя"}
                    updateFields={updateFields}
                    field_key={"name"} value={name}
                />

                {entity === 'juridical' &&
                    <InputForm
                        type="text" required={true}
                        label={"Название комании *"}
                        placeHolder={"Введите название компании"}
                        updateFields={updateFields}
                        field_key={"company_name"}
                        value={company_name}
                    />
                }

                <InputForm
                    type="text" required={true}
                    label={"Моб. телефон *"}
                    placeHolder={"+7   (7 _ _)   _ _ _    _ _    _ _"}
                    updateFields={updateFields}
                    field_key={"phone"}
                    value={phone}
                />

                <InputForm
                    type="email" required={true}
                    label={"Электронная почта *"}
                    placeHolder={"Введите вашу эл. почту"}
                    updateFields={updateFields}
                    field_key={"email"}
                    value={email}
                />

            </>
        );
}