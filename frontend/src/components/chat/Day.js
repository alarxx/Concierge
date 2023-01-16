import React from 'react'

export default function Day({ day="Сегодня"}){
    return (
        <div className="chat-day__wrapper">
            <div className="chat-day tac">
                {day}
            </div>
        </div>
    );
}