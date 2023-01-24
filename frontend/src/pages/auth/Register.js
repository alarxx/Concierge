import React, {useEffect, useState} from 'react';

import WorkTypes from "./registerForms/WorkTypesForm";
import UserForm from "./registerForms/UserForm";

import MultistepForm from "../../components/form/MultistepForm";
import {useLocation, useNavigate} from "react-router-dom";

const INITIAL_DATA = {
    entity: '',
    name: '',
    company: '',
    phone: '',
    email: '',
}

// registerForms.map(form => form({...data, updateFields}) )
const forms = [WorkTypes, UserForm]

/**
 * Регистрация может перенаправлять с сохранением состояния.
 * {
 *  state: {
 *     redirect, // куда перенаправить после регистрации,
 *     ...state // все остальное состояние
 *  }
 * }
 * После регистрации у нас удаляется поле state.redirect
 * */
export default function Register() {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        // console.log("register state", location.state);
    }, [])

    function onSubmit(data){
            // что делать после того, как у нас готова форма?
            // console.log("register", data);
            if(location.state?.redirect){
                const state = {...location.state};
                delete state.redirect;
                navigate(location.state.redirect, {replace: true, state});
            }
            else {
                navigate('/', {replace: true});
            }
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