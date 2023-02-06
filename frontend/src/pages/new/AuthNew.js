import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";
import Header from "./Header";



export default function AuthNew(){

    const {authHandler} = useAppContext();
    const {user} = authHandler;

    const [activeTab, setActiveTab] = useState('signin');
    const handleTabChange = tab => {
        setActiveTab(tab);
    };

    return (
        <div className='admin'>
            <Header user={user}></Header>

            <section className="workflow">
                <div className="container2">
                    <div className="sign__wrapper">
                        <div className="sign sign-fixed">
                            <div className="sign__header">
                                <div className="sign__logo">
                                    <img src="/img/logo.png" alt="ConciergeService"/>
                                </div>
                                <div className="sign__tabs dflex aic">
                                    <span
                                        className={`sign__tab ${activeTab === 'signin' ? 'sign__tab-active' : ''}`}
                                        onClick={() => handleTabChange('signin')}
                                    >Вход</span>
                                    <span
                                        className={`sign__tab ${activeTab === 'signup' ? 'sign__tab-active' : ''}`}
                                        onClick={() => handleTabChange('signup')}
                                    >Регистрация</span>
                                </div>
                            </div>
                            {activeTab === 'signin' && 
                                <div className="sign__body">
                                    <form action="auth">
                                        <div className="input-form">
                                            <label htmlFor="people_quantity">Эл. почта *</label>
                                            <input type="email" name="email" className="input input-choice"
                                                placeholder="Введите вашу эл. почту" required/>
                                        </div>
                                        <div className="input-form">
                                            <label htmlFor="people_quantity">Пароль</label>
                                            <input type="password" name="password" className="input input-choice"
                                                placeholder="Введите пароль" required/>
                                        </div>
                                        <button className="btn btn-main" type="submit">Войти</button>
                                    </form>
                                </div>
                            }
                            {activeTab === 'signup' && <div>Tab 2 content</div>}
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}