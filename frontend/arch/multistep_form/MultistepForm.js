import React, {useEffect, useState} from 'react';
import useMultistepForm from "./useMultistepForm";
import UserForm from "./forms/UserForm";
import AddressForm from "./forms/AddressForm";
import AccountForm from "./forms/AccountForm";

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

export default function MultistepForm() {
    const [data, setData] = useState(INITIAL_DATA);

    function updateFields(fields){
        console.log(fields);
        setData(prev => ({...prev, ...fields}));
    }

    const {steps, currentStepIndex, step, isFirstStep, isLastStep, back, next} = useMultistepForm([
        <UserForm {...data} updateFields={updateFields} />,
        <AddressForm {...data} updateFields={updateFields} />,
        <AccountForm {...data} updateFields={updateFields} />,
    ]);

    function onSubmit(e){
        e.preventDefault();
        if(!isLastStep)
            return next();
        console.log(data);
        alert('success');
    }

    return (
        <div style={{
            position: "relative",
            background: "white",
            border: "1px solid black",
            padding: "2rem",
            margin: "1rem",
            borderRadius: "0.5rem",
            fontFamily: "Arial"
        }}>
            <form onSubmit={onSubmit}>
                <div style={{
                    position: "absolute", top: "0.5rem", right: "0.5rem",
                }}>
                    {currentStepIndex + 1} / {steps.length}
                </div>

                {step}

                <div style={{
                    marginTop: "1rem",
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "flex-end",
                }}>
                    {!isFirstStep && <button type="button" onClick={back}>Back</button>}
                    <button type="submit">
                        {isLastStep ? "Finish" : "Next"}
                    </button>
                </div>
            </form>
        </div>
    );
}