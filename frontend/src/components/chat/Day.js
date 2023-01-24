import React, {useEffect, useState} from 'react'

function month(m){
    switch(m){
        case 0:
            return "Январь"
        case 1:
            return "Февраль"
        case 2:
            return "Апрель"
        case 3:
            return "Март"
        case 4:
            return "Май"
        case 5:
            return "Июнь"
        case 6:
            return "Июль"
        case 7:
            return "Август"
        case 8:
            return "Сентябрь"
        case 9:
            return "Октябрь"
        case 10:
            return "Ноябрь"
        case 11:
            return "Февраль"
    }
}

export default function Day({ date }){

    const [str, setStr] = useState('')

    useEffect(()=>{
        if(date.getDate() == new Date().getDate())
            setStr(`Сегодня`)
        else setStr(`${month(date.getMonth())} ${date.getDate()}`)
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