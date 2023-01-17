import React, {useEffect, useState} from 'react';

import WorkTypes from "./forms/WorkTypesForm";
import UserForm from "./forms/UserForm";

import MultistepForm from "../../form/MultistepForm";

const INITIAL_DATA = {
    entity: '',
    name: '',
    company: '',
    phone: '',
    email: '',
}

// forms.map(form => form({...data, updateFields}) )
const forms = [WorkTypes, UserForm]

export default function Register() {

    function onSubmit(data){
            // что делать после того, как у нас готова форма?
            console.log(data);
    }

    return (
        <MultistepForm
            forms={forms}
            INITIAL_DATA={INITIAL_DATA}
            onSubmit={onSubmit}
            submitButtonName={"Создать аккаунт"}
        />
    );
}