import React, {useEffect, useState} from 'react';

import useMultistepForm from "../../hooks/useMultistepForm";

import WorkTypes from "./forms/WorkTypes";
import UserForm from "./forms/UserForm";

// arrow-right, -
import ArrowRight from '../../../icons/arrow-right.svg'
import MultistepForm from "../../formComponents/MultistepForm";

const INITIAL_DATA = {

}

const forms = [WorkTypes, UserForm]

export default function Register({ auth }) {
    function onSubmit(e){
            // что делать после того, как у нас готова форма?
            console.log(e);
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