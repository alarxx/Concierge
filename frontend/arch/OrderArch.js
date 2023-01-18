import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import useMultistepForm from "../src/components/hooks/useMultistepForm";

import F1_Plans from "../src/pages/order/forms/F1_Plans";
import F2_Needs from "../src/pages/order/forms/F2_Needs";
import F3 from "../src/pages/order/forms/F3_General";
import F4_Tickets from "../src/pages/order/forms/F4_Tickets";
import F5_Housing from "../src/pages/order/forms/F5_Housing";
import HotelsSelection6 from "../src/pages/order/forms/F6_HotelsSelection";
import F7_Transport from "../src/pages/order/forms/F7_Transport";
import F8 from "../src/pages/order/forms/F8_Calculation";

import ArrowRight from "../src/icons/arrow-right.svg";

const INITIAL_DATA = {

}

const forms = [F1_Plans, F2_Needs, F3, F4_Tickets, F5_Housing, HotelsSelection6, F7_Transport, F8]

export default function OrderArch() {
    const navigate = useNavigate();

    const [data, setData] = useState(INITIAL_DATA);

    function updateFields(fields){
        // console.log(fields);
        setData(prev => ({...prev, ...fields}));
    }

    const {steps, currentStepIndex, step, isFirstStep, isLastStep, back, next} = useMultistepForm(
        forms.map(form => form({...data, updateFields}) )
    );

    function onSubmit(data){
        if(!isLastStep){
            return next();
        }
        else {
            // что делать после того, как у нас готова форма?
            console.log(data);
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
                        <ArrowRight viewBox="0 0 24 24"/>
                        <span>Назад</span>
                    </div>}

                    <div className="btn btn-main btn-next" onClick={()=>onSubmit(data)}>
                        <span>{isLastStep ? "Оставить заявку" : "Далее"}</span>
                        <ArrowRight viewBox="0 0 24 24"/>
                    </div>
                </div>

            </form>
        </div>
    );
}