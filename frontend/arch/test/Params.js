import React, {useEffect, useState} from 'react'
import {useSearchParams} from "react-router-dom";

export default function Params({defaultV="asdf"}){
    const [searchParams, setSearchParams] = useSearchParams({v: defaultV})

    const value = searchParams.get("v");

    useEffect(()=>{
        console.log(value);
    })

    return (
        <>
            <h1>{value}</h1 >
            <input
                type="text"
                value={value}
                onChange={e => setSearchParams({...searchParams, v: e.target.value})}
            />
        </>
    );
}