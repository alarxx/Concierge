import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";

/**
 *
 * */
export default function useMultistep(Steps=[], initialStep=0){

    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(()=>{
        if(searchParams.has('step')){
            navigate('/', {replace: true});
        }
        setSearchParams({ step: initialStep }, {replace: true}); // не сразу меняет
    }, [])

    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    useEffect(()=>{
        if(!searchParams.has('step')){
            return;
        }
        // console.log("useMultistep searchParams.step", parseInt(searchParams.get('step')));
        setCurrentStepIndex(parseInt(searchParams.get('step')));
    }, [searchParams])


    const [lastStep, setLastStep] = useState(0);

    useEffect(()=>{
        setLastStep(Steps.length - 1);
    }, [Steps])


    function next(){
        if(currentStepIndex < lastStep){
            const step = currentStepIndex < Steps.length - 1 ? currentStepIndex + 1 : currentStepIndex;
            setSearchParams({ step });
            // return setCurrentStepIndex(currentStepIndex + 1);
        }
    }

    function back(){
        /*setCurrentStepIndex(i => {
            if(i <= 0)
                return i;
            return i - 1;
        })*/

        // Это неправильно, потому что в history добавляется step, даже если replace 1 -> 2 -> back(){replace 2 set 1} -> navigate back -> 1 (2 раза 1 получилось)
        // const step = currentStepIndex <= 0 ? currentStepIndex : currentStepIndex - 1;
        // setSearchParams({ step })//, {replace: true});

        if(currentStepIndex > 0){
            navigate(-1, {replace: true});
        }
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