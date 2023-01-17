import React from 'react';

export default function CardOrder({name="Астана - Будапешт",date="12 мая - 20 мая", typeOrder="Командировка", countOfPeople="100 чел.", clientName="Казмунайгаз", statusOrder="Новый"}){
    return (
        <div className="card card-order">
            <div className="card-order__info info">
                <div className="info__title">
                    {name}
                </div>
                <div className="info__date">
                    {date}
                </div>
                <div className="info__details">
                    <span>{typeOrder}</span>
                    <span>{countOfPeople}</span>
                </div>
                <div className="info__client">
                    <div className="logo-client">
                        <img src={"img/logo-client.png"} alt="logo-client"/>
                    </div>
                    {clientName}
                </div>
            </div>
            <div className="card-order__status status status-new">
                <span>{statusOrder}</span>
            </div>
        </div>
    );
}