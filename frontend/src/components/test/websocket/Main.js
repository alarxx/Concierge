import React, {useEffect} from 'react';

export default function Main(){
    useEffect(()=>{
        (async () => {
            const response = await fetch('/');
            const j = response.json()
            console.log(j);
        })();
    })
    return (<h1>Hello World!</h1>);
}