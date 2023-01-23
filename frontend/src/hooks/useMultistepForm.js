import React, {useState} from 'react';

export default function useMultistepForm(steps){
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [lastStep, ] = useState(steps.length - 1)


    function next(){
        setCurrentStepIndex(i => {
            if(i >= lastStep)
                return i;
            return i + 1;
        });
    }

    function back(){
        setCurrentStepIndex(i => {
            if(i <= 0)
                return i;
            return i - 1;
        })
    }

    function goTo(index){
        setCurrentStepIndex(index)
    }

    return {
        steps,
        currentStepIndex,
        step: steps[currentStepIndex],
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === lastStep,
        next,
        back,
        goTo
    };
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