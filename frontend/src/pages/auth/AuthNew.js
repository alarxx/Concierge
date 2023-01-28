import React from 'react';


export default function AuthNew(){
    return (
        <div className='admin'>
            <header>
                <div className="container">
                    <nav>
                        <div className="nav__left">
                            <div className="logo">
                                <a href="#">
                                    <img src="/img/logo.png" alt="ConciergeService"/>
                                </a>
                            </div>
                            <ul className="menu-admin">
                                <li className="menu-admin__li"><a href="#">Заявки</a></li>
                                <li className="menu-admin menu-admin-active"><a href="#">Пользователи</a></li>
                                <li className="menu-admin"><a href="#">Партнеры</a></li>
                                <li className="menu-admin"><a href="#">Направления</a></li>
                            </ul>
                        </div>
                        <div className="user_nav dflex aic">
                            <span>John Fish</span>
                            <div className="user_avatar">

                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            <section className="workflow">
                <div className="container2">
                    <div className="sign__wrapper">
                        <div className="sign sign-fixed">
                            <div className="sign__header">
                                <div className="sign__logo">
                                    <img src="/img/logo.png" alt="ConciergeService"/>
                                </div>
                                <div className="sign__tabs dflex aic">
                                    <span className="sign__tab sign__tab-active">Вход</span>
                                    <span className="sign__tab">Регистрация</span>
                                </div>
                            </div>
                            <div className="sign__body">
                                <form action="">
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
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}