import React, { useState, useEffect } from 'react';
import {useAppContext} from "../../context/AppContext";
import Header from "./Header";
import Table from "../../components/ui/Table";
import {useNavigate} from "react-router-dom";

export default function Admin(){
    const navigate = useNavigate()

    const {authHandler} = useAppContext();
    const {user, isAuthenticated} = authHandler;

    useEffect(()=>{
        if(!isAuthenticated() || user.role !== 'manager') {
            navigate('/', {replace: true})
        }
    }, []);

    return (
        <>{isAuthenticated() && user.role === 'manager' &&

            <div className="admin">
                <Header user={user} isAuthenticated={isAuthenticated} pageName="users"></Header>

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
                    </div>
                </div>
            </div>

        }</>
    );
}