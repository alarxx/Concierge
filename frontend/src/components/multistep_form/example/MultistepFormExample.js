import React, {useEffect, useState} from 'react';
import useMultistepForm from "../useMultistepForm";
import UserForm from "./forms/UserForm";
import AddressForm from "./forms/AddressForm";
import AccountForm from "./forms/AccountForm";
import MultistepForm from "../MultistepForm";

const INITIAL_DATA = {
    firstName: '',
    lastName: '',
    age: '',
    street: '',
    city: '',
    state: '',
    email: '',
    password: '',
}

export default function MultistepFormExample() {
    const forms = [
        UserForm,
        AddressForm,
        AccountForm,
    ];

    function onSubmit(data){
        console.log(data);
        alert('success');
    }

    return (<MultistepForm INITIAL_DATA={INITIAL_DATA} forms={forms} onSubmit={onSubmit} />);
}