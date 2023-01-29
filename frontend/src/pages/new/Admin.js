import React, { useState, useEffect } from 'react';
import {useAppContext} from "../../context/AppContext";
import Header from "./Header";
import Table from "../../components/ui/Table";

export default function Admin(){

    const {authHandler} = useAppContext();
    const {user} = authHandler;


    return (
        <div className="admin">
            <Header user={user}></Header>

            <div className="workflow">
                <div className="container2">
                    <div className="workflow__wrapper">
                        <div className="title-admin">
                            Пользователи
                        </div>
                        <div className="tabs">
                            <ul className="tab dflex aic">
                                <li className="tab__li tab__li-active"><a href="frontend/src/pages#" data-tab="managers">Менеджеры</a></li>
                                <li className="tab__li"><a href="frontend/src/pages#" data-tab="b2b">B2B клиенты</a></li>
                                <li className="tab__li"><a href="frontend/src/pages#" data-tab="b2c">B2С клиенты</a></li>
                            </ul>
                        </div>

                        <div className="table" id="managers">
                            <div className="table__header dflex aic jcsb">
                                <div className="table__title">
                                    Главные менеджеры
                                </div>
                                <div className="table__btn">
                                    <div className="btn btn-main">
                                        Добавить пользователя
                                    </div>
                                </div>
                            </div>
                            <div className="table__body">
                                <Table />
                            </div>
                        </div>
                    </div>
                    
                    <div className="workflow__wrapper">
                        <div className="title-admin">
                            Новые заявки
                        </div>
                        <div className="tabs dflex aic jcsb">
                            <ul className="tab dflex aic">
                                <li className="tab__li tab__li-active"><a href="frontend/src/pages#" data-tab="all">Все</a></li>
                                <li className="tab__li"><a href="frontend/src/pages#" data-tab="worktravel">Командировки</a></li>
                                <li className="tab__li"><a href="frontend/src/pages#" data-tab="conciergevents">Мероприятия</a></li>
                            </ul>
                            <a href="frontend/src/pages">Архив</a>
                        </div>

                        <div className="orders" id="all">
                            <div className="orders__wrapper">
                                <div className="card card-order">
                                    <div className="card-order__header">
                                        <div className="card-order__info info">
                                            <div className="info__title">
                                                Астана - Будапешт
                                            </div>
                                            <div className="info__date">
                                                12 мая - 20 мая
                                            </div>
                                            <div className="info__details">
                                                <span>Командировка</span>
                                                <span>100 чел.</span>
                                            </div>
                                        </div>
                                        <div className="card-order__status">
                                            <span className="status status-new">Новый</span>
                                            <span className="status status-primary">Новый</span>
                                            <span className="status status-new">Новый</span>
                                        </div>
                                    </div>
                                    <div className="card-order__footer">
                                        <div className="info__client">
                                            <div className="logo-client">
                                                <img src="/img/logo-client.png" alt="logo-client"/>
                                            </div>
                                            Казмунайгаз
                                        </div>
                                        <div className="info__client">
                                            <div className="logo-client">
                                                <img src="/img/logo-client.png" alt="ava-manager"/>
                                            </div>
                                            Виктория
                                        </div>
                                    </div>
                                    <div className="card-order__progress">
                                        <div className="progressbar">
                                            <div className="progress"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card card-order">
                                    <div className="card-order__header">
                                        <div className="card-order__info info">
                                            <div className="info__title">
                                                Астана - Будапешт
                                            </div>
                                            <div className="info__date">
                                                12 мая - 20 мая
                                            </div>
                                            <div className="info__details">
                                                <span>Командировка</span>
                                                <span>100 чел.</span>
                                            </div>
                                        </div>
                                        <div className="card-order__status">
                                            <span className="status status-new">Новый</span>
                                            <span className="status status-primary">Новый</span>
                                            <span className="status status-new">Новый</span>
                                        </div>
                                    </div>
                                    <div className="card-order__footer">
                                        <div className="info__client">
                                            <div className="logo-client">
                                                <img src="/img/logo-client.png" alt="logo-client"/>
                                            </div>
                                            Казмунайгаз
                                        </div>
                                        <div className="info__client">
                                            <div className="logo-client">
                                                <img src="/img/logo-client.png" alt="ava-manager"/>
                                            </div>
                                            Виктория
                                        </div>
                                    </div>
                                    <div className="card-order__progress">
                                        <div className="progressbar">
                                            <div className="progress"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card card-order">
                                    <div className="card-order__header">
                                        <div className="card-order__info info">
                                            <div className="info__title">
                                                Астана - Будапешт
                                            </div>
                                            <div className="info__date">
                                                12 мая - 20 мая
                                            </div>
                                            <div className="info__details">
                                                <span>Командировка</span>
                                                <span>100 чел.</span>
                                            </div>
                                        </div>
                                        <div className="card-order__status">
                                            <span className="status status-new">Новый</span>
                                            <span className="status status-primary">Новый</span>
                                            <span className="status status-new">Новый</span>
                                        </div>
                                    </div>
                                    <div className="card-order__footer">
                                        <div className="info__client">
                                            <div className="logo-client">
                                                <img src="/img/logo-client.png" alt="logo-client"/>
                                            </div>
                                            Казмунайгаз
                                        </div>
                                        <div className="info__client">
                                            <div className="logo-client">
                                                <img src="/img/logo-client.png" alt="ava-manager"/>
                                            </div>
                                            Виктория
                                        </div>
                                    </div>
                                    <div className="card-order__progress">
                                        <div className="progressbar">
                                            <div className="progress" style={{width:"70%"}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}