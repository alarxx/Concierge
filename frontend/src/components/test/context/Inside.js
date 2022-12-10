import React, {useEffect, useState} from 'react'

import {useMyContext} from './MyContext';

export default function Inside(){
    const [times, setTimes] = useState(0);
    const {a, setA, sayHi} = useMyContext();
    useEffect(()=>{
        sayHi();
        setTimeout(()=>{
            setTimes(times + 1);
            setA(`${times+1} seconds left after hi`);
        }, 1000)
    })
    return (
        <h5>{a}</h5>
    );
}