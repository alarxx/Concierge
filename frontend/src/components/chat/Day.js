import React from 'react'

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
            return "Январь"
        case 8:
            return "Январь"
        case 9:
            return "Январь"
        case 10:
            return "Январь"
        case 11:
            return "Январь"
        case 12:
            return "Январь"
    }
}

export default function Day({ date, lastDate, setLastDate }){

    const d = Date.parse(date);

    return (
        <div className="chat-day__wrapper">
            <div className="chat-day tac">
            </div>
        </div>
    );
}