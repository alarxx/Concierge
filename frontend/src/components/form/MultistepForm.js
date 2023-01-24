import React, {useEffect, useState} from 'react';

import useMultistepForm from "../../hooks/useMultistepForm";

import ArrowRight from "../../assets/icons/arrow-right.svg";

/*const INITIAL_DATA = {}
const forms = [F1_Plans, F2_Needs, F3, F4_Tickets, F5_Housing, HotelsSelection6, F7_Transport, F8]*/


export default function MultistepForm({
                                          forms=[],
                                          data={},
                                          setData=f=>f,
                                          init_step=0,
                                          onSubmit=f=>f,
                                          nextButtonName="Далее",
                                          backButtonName="Назад",
                                          submitButtonName="Отправить"
}) {

    function updateFields(fields){
        setData(prev => {
            // console.log({...prev, ...fields});
            return ({...prev, ...fields})
        });
    }

    const {steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo} = useMultistepForm(
        forms.map(form => form({...data, updateFields, next, back, goTo}) )
    );

    useEffect(()=>{
        console.log("currentStepIndex", currentStepIndex);
    }, [currentStepIndex])

    function onSubmitInside(){
        if(!isLastStep){
            return next();
        }
        else {
            // что делать после того, как у нас готова форма?
            onSubmit(data);
        }
    }

    function handleKeyDown(e){
        if (e.keyCode === 13) { //'ENTER'
            onSubmitInside();
        }
        else if(e.keyCode === 27){ //'ESC'
            back()
        }
    }

    useEffect(() => {
        // Не совсем понятно как работать с домом напрямую
        // Можно указать только на начальный рендер, но там как-то странно работают состояния,
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    });


    const [inverted,] = useState(forms.map((form, i) => {
        if(form.isControlPanelOnTop)
            return i;
    }));

    useEffect(()=>{
        if(init_step===-1)
            goTo(steps.length - 1)
        else goTo(init_step)
    }, [init_step])


    return (
        <div className='container'>
            <form className={`form-workflow ${inverted.includes(currentStepIndex) ? 'reverse-column' : ''}`}>
                <div style={{
                    position: "absolute", top: "0.5rem", right: "0.5rem",
                }}>
                    {currentStepIndex + 1} / {steps.length}
                </div>

                <div className="form__body">
                    {step}
                </div>

                <div className={isFirstStep ? "form-controls form-controls-done" : "form-controls"}>

                    {!isFirstStep &&
                        <div className="btn btn-secondary btn-prev mr-5" onClick={back}>
                            <ArrowRight viewBox="0 0 24 24"/>
                            <span>{backButtonName}</span>
                        </div>}

                    <div className="btn btn-main btn-next" onClick={ e => onSubmitInside() }>
                        <span>{isLastStep ? submitButtonName : nextButtonName}</span>
                        <ArrowRight viewBox="0 0 24 24"/>
                    </div>
                </div>

            </form>
        </div>
    );
}

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/