import React from "react";


export default function CardAdmin(props) {
    
    // принимает какой-то объект заказа с бд, ниже формируем объект из props, чтобы дальше выводить в карточке
    const cardData = {
        title: "Астана - Будапешт",
        date: "12 мая - 20 мая",
        info: {
            type: "Командировка",
            countOfPeople: "100 чел."
        },
        tags: ["Зеленый","Синий","Красный"],
        client: "Казмунайгаз",
        manager: "Виктория",
        progress: {
            width: 80+'%'
        }
    }
    return (
        <div className="card card-order">
            <div className="card-order__header">
                <div className="card-order__info info">
                    <div className="info__title">
                        {cardData.title}
                    </div>
                    <div className="info__date">
                        {cardData.date}
                    </div>
                    <div className="info__details">
                        <span>{cardData.info.type}</span>
                        <span>{cardData.info.countOfPeople}</span>
                    </div>
                </div>
                <div className="card-order__status">
                    {cardData.tags.map( item => (
                        <span className="status status-new status-primary">{item}</span>
                    ))}
                </div>
            </div>
            <div className="card-order__footer">
                <div className="info__client">
                    <div className="logo-client">
                        <img src="/img/logo-client.png" alt="logo-client"/>
                    </div>
                    {cardData.client}
                </div>
                <div className="info__client">
                    <div className="logo-client">
                        <img src="/img/logo-client.png" alt="ava-manager"/>
                    </div>
                    {cardData.manager}
                </div>
            </div>
            <div className="card-order__progress">
                <div className="progressbar">
                    <div className="progress" style={cardData.progress}></div>
                </div>
            </div>
        </div>
    )
}