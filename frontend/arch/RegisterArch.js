import React, {useEffect, useState} from 'react';

import useMultistepForm from "../src/hooks/useMultistepForm";

import WorkTypes from "../src/pages/auth/registerForms/WorkTypesForm";
import UserForm from "../src/pages/auth/registerForms/UserForm";

// arrow-right, -
import ArrowRight from '../src/assets/icons/arrow-right.svg'

const INITIAL_DATA = {

}

const forms = [WorkTypes, UserForm]

export default function RegisterArch({ }) {
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
                        <ArrowRight viewBox="0 0 24 24"/>
                        <span>Назад</span>
                    </div>}

                    <div className="btn btn-main btn-next" onClick={next}>
                        <span>{isLastStep ? "Создать аккаунт" : "Далее"}</span>
                        <ArrowRight viewBox="0 0 24 24"/>
                    </div>
                </div>

            </form>
        </div>
    );
}