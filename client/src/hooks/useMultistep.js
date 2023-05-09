import React, {useState} from 'react';

/**
 *
 * */
export default function useMultistep(Steps=[]){
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [lastStep, ] = useState(Steps.length - 1)


    function next(){
        if(currentStepIndex < lastStep){
            return setCurrentStepIndex(currentStepIndex + 1);
        }
    }

    function back(){
        setCurrentStepIndex(i => {
            if(i <= 0)
                return i;
            return i - 1;
        })
    }

    function goTo(index){
        setCurrentStepIndex(index);
    }

    return {
        Steps,
        currentStepIndex,
        Step: Steps[currentStepIndex],
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