import React from "react";

import Input from "../../../shared/ui/input/Input";

export default function MyInput({
                     placeHolder="Введите значение",
                     name="_",
                     type="text",
                     required=false,
                     data={},
                     upsertFields=f=>f,
                 }){
    return (
        <Input
            name={name}
            placeHolder={placeHolder}
            type={type}
            value={data[name]}
            onChange={e=>upsertFields({[name]: e.target.value})}
            required={required}
        />
    );
}