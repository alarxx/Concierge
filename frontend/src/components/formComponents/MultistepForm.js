import React, {useEffect, useState} from 'react';

import useMultistepForm from "../hooks/useMultistepForm";

import ArrowRight from "../../icons/arrow-right.svg";

/*const INITIAL_DATA = {}
const forms = [F1_Plans, F2_Needs, F3, F4_Tickets, F5_Housing, HotelsSelection6, F7_Transport, F8]*/

export default function MultistepForm({
                                          forms=[],
                                          INITIAL_DATA={},
                                          onSubmit=f=>f,
                                          nextButtonName="Далее",
                                          backButtonName="Назад",
                                          submitButtonName="Отправить"
}) {

    const [data, setData] = useState(INITIAL_DATA);

    function updateFields(fields){
        // console.log(fields);
        setData(prev => ({...prev, ...fields}));
    }

    const {steps, currentStepIndex, step, isFirstStep, isLastStep, back, next} = useMultistepForm(
        forms.map(form => form({...data, updateFields}) )
    );

    function onSubmitInside(data){
        if(!isLastStep){
            return next();
        }
        else {
            // что делать после того, как у нас готова форма?
            onSubmit(data);
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
                            <span>{backButtonName}</span>
                        </div>}

                    <div className="btn btn-main btn-next" onClick={()=>onSubmitInside(data)}>
                        <span>{isLastStep ? submitButtonName : nextButtonName}</span>
                        <ArrowRight viewBox="0 0 24 24"/>
                    </div>
                </div>

            </form>
        </div>
    );
}