import React, {useEffect, useState} from 'react'
import monthName from "../../handlers/monthName";

export default function Day({ date }){

    const [str, setStr] = useState('')

    useEffect(()=>{
        if(date.getDate() == new Date().getDate())
            setStr(`Сегодня`)
        else setStr(`${monthName(date.getMonth())} ${date.getDate()}`)
    }, [date])

    return (
        <>
            <div className="chat-day__wrapper">
                <div className="chat-day tac">
                    {str}
                </div>
            </div>
        </>
    );
}