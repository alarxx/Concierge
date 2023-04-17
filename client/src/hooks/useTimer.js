import React, {useEffect, useState} from 'react';

/**
 * @seconds > 0, иначе он не запустится.
 *
 * Always timer >= 0.
 * Interval не работает если timer <= 0.
 * */
export default function useTimer(callback=f=>f, seconds=0){

    const [running, setRunning] = useState(false);
    const [timer, setTimer] = useState(seconds);

    function startTimer(){
        if(timer <= 0) {
            return;
        }
        setRunning(true);
    }

    function stopTimer(){
        setRunning(false);
    }

    function resetTimer(){
        setTimer(seconds)
    }


    useEffect(()=>{
        if(!running) return;

        setTimer((i) => i <= 0 ? i : i - 1)
        const interval = setInterval(()=>{
            setTimer((i) => {
                // console.log('tick', i);
                return i <= 0 ? i : i - 1
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [running]);


    useEffect(()=>{
        if(timer <= 0){
            stopTimer();
            callback();
        }
    }, [timer]);

    return ({ timer, startTimer, stopTimer, resetTimer });
}