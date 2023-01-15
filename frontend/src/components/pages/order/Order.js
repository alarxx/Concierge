import React, {useEffect, useState} from 'react';
import useMultistepForm from "../../hooks/useMultistepForm";
import F2 from "./forms/F2";
import F3 from "./forms/F3";
import F4 from "./forms/F4";
import F5 from "./forms/F5";
import F6 from "./forms/F6";
import F7 from "./forms/F7";
import F8 from "./forms/F8";
import {useNavigate} from "react-router-dom";

const INITIAL_DATA = {

}

const forms = [F2, F3, F4, F5, F6, F7, F8]

export default function Order() {
    const navigate = useNavigate();

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
            console.log(e);

            return next();
        }
        else {
            // что делать после того, как у нас готова форма?

            console.log(e);
            navigate('/register')
        }
    }

    return (
        <div>
            <form className="container">
                {/*<div style={{
                    position: "absolute", top: "0.5rem", right: "0.5rem",
                }}>
                    {currentStepIndex + 1} / {steps.length}
                </div>*/}

                <div className="form-workflow">
                    {step}
                </div>

                <div className={isFirstStep ? "form-controls form-controls-done" : "form-controls"}>

                    {!isFirstStep &&
                    <div className="btn btn-secondary btn-prev mr-5" onClick={back}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.4299 5.92993L20.4999 11.9999L14.4299 18.0699" stroke="#292D32"
                                  stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                  stroke-linejoin="round"/>
                            <path d="M3.5 12H20.33" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10"
                                  stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Назад</span>
                    </div>}

                    <div className="btn btn-main btn-next" onClick={onSubmit}>
                        <span>{isLastStep ? "Оставить заявку" : "Далее"}</span>
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