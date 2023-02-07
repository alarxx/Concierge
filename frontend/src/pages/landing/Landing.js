import React from 'react';
import {useNavigate} from "react-router-dom";


export default function Landing({}){

    const navigate = useNavigate();

    return (
        <section className="promoland">
            <div className="container">
                <div className="promoland__wrapper">
                    <div className="promoland__logo">
                        <img src="/img/concierge.png" alt=""/>
                    </div>
                    <h1>
                        Самые продуктивные командировки и мероприятия
                    </h1>
                    <h2>
                        Позвольте себе не думать об организационных моментах
                    </h2>
                    <div className="promoland__btns">
                        <a className="promoland__btn" onClick={e => navigate('/order')}>Заказать услугу</a>
                        <a className="promoland__btn" onClick={e => navigate('/authenticate')}>Авторизация</a>
                        <a className="promoland__btn" onClick={e => navigate('/')}>Рассчитать стоимость</a>
                    </div>
                </div>
            </div>
        </section>
    )
}