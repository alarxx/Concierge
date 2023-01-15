import React, {useEffect, useState} from 'react';

import useMultistepForm from "../../hooks/useMultistepForm";

import WorkTypes from "./forms/WorkTypes";
import UserForm from "./forms/UserForm";

// arrow-right, -
import ArrowRight from '../../../icons/arrow-right.svg'

const INITIAL_DATA = {

}

const forms = [WorkTypes, UserForm]

export default function Register({ }) {
    const [data, setData] = useState(INITIAL_DATA);

    function updateFields(fields){
        // console.log(fields);
        setData(prev => ({...prev, ...fields}));
    }

    const {steps, currentStepIndex, step, isFirstStep, isLastStep, back, next} = useMultistepForm(
        forms.map(form => form({...data, updateFields}) )
    );

    function onSubmit(e){
        e.preventDefault();

        if(!isLastStep){
            return next();
        }
        else {
            // что делать после того, как у нас готова форма?
            console.log(e);
        }
    }

    return (
        <div>
            <form className="container">
                <div className="form-workflow">
                    {step}
                </div>

                <div className={isFirstStep ? "form-controls form-controls-done" : "form-controls"}>

                    {!isFirstStep &&
                    <div className="btn btn-secondary btn-prev mr-5" onClick={back}>
                        <ArrowRight svg={{width: 16, height: 16}}/>
                        <span>Назад</span>
                    </div>}

                    <div className="btn btn-main btn-next" onClick={next}>
                        <span>{isLastStep ? "Создать аккаунт" : "Далее"}</span>
                        {/*<Arrow width={"24"} height={"24"}/>*/}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.4299 5.92993L20.4999 11.9999L14.4299 18.0699" stroke="#ffff" stroke-width="1.5"
                                  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M3.5 12H20.33" stroke="#ffff" stroke-width="1.5" stroke-miterlimit="10"
                                  stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>

            </form>
        </div>
    );
}