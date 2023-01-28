import React from 'react';

export default function Admin(){
    return (
        <div className="admin">
        <header>
            <div className="container">
                <nav>
                    <div className="nav__left">
                        <div className="logo">
                            <a href="#">
                                <img src="img/logo.png" alt="ConciergeService"/>
                            </a>
                        </div>
                        <ul className="menu">
                            <li className="menu__li"><a href="#">Заявки</a></li>
                            <li className="menu__li menu__li-active"><a href="#">Пользователи</a></li>
                            <li className="menu__li"><a href="#">Партнеры</a></li>
                            <li className="menu__li"><a href="#">Направления</a></li>
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
                <div className="workflow__wrapper">
                    <div className="title">
                        Пользователи
                    </div>
                    <div className="tabs">
                        <ul className="tab dflex aic">
                            <li className="tab__li tab__li-active"><a href="#" data-tab="managers">Менеджеры</a></li>
                            <li className="tab__li"><a href="#" data-tab="b2b">B2B клиенты</a></li>
                            <li className="tab__li"><a href="#" data-tab="b2c">B2С клиенты</a></li>
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
                            <table>
                                <tr>
                                    <th>ID</th>
                                    <th>Имя менеджера</th>
                                    <th>Эл. почта</th>
                                    <th>Направление</th>
                                    <th>Кол-во партнеров</th>
                                    <th>Общ. сумма</th>
                                    <th>Статус</th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <td>984561</td>
                                    <td>Имя Фамилия</td>
                                    <td>sample_mail@mail.ru</td>
                                    <td>Консультант</td>
                                    <td>3</td>
                                    <td>120 000тг</td>
                                    <td className="color-success">Свободен</td>
                                    <td>
                                        {/*<!-- svg more -->*/}

                                        <ul className="context-menu">
                                            <li className="context-menu__li">Полная информация</li>
                                            <li className="context-menu__li">Удалить</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>984561</td>
                                    <td>Имя Фамилия</td>
                                    <td>sample_mail@mail.ru</td>
                                    <td>Консультант</td>
                                    <td>3</td>
                                    <td>120 000тг</td>
                                    <td className="color-danger">Свободен</td>
                                    <td>
                                        {/*<!-- svg more -->*/}

                                    </td>
                                </tr>
                                <tr>
                                    <td>984561</td>
                                    <td>Имя Фамилия</td>
                                    <td>sample_mail@mail.ru</td>
                                    <td>Консультант</td>
                                    <td>3</td>
                                    <td>120 000тг</td>
                                    <td className="color-primary">Свободен</td>
                                    <td>
                                        {/*<!-- svg more -->*/}

                                    </td>
                                </tr>
                                <tr>
                                    <td>984561</td>
                                    <td>Имя Фамилия</td>
                                    <td>sample_mail@mail.ru</td>
                                    <td>Консультант</td>
                                    <td>3</td>
                                    <td>120 000тг</td>
                                    <td>Свободен</td>
                                    <td>
                                        {/*<!-- svg more -->*/}

                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="workflow__wrapper">
                    <div className="title">
                        Новые заявки
                    </div>
                    <div className="tabs dflex aic jcsb">
                        <ul className="tab dflex aic">
                            <li className="tab__li tab__li-active"><a href="#" data-tab="all">Все</a></li>
                            <li className="tab__li"><a href="#" data-tab="worktravel">Командировки</a></li>
                            <li className="tab__li"><a href="#" data-tab="conciergevents">Мероприятия</a></li>
                        </ul>
                        <a href="">Архив</a>
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
                                            <img src="img/logo-client.png" alt="logo-client"/>
                                        </div>
                                        Казмунайгаз
                                    </div>
                                    <div className="info__client">
                                        <div className="logo-client">
                                            <img src="img/logo-client.png" alt="ava-manager"/>
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
                                            <img src="img/logo-client.png" alt="logo-client"/>
                                        </div>
                                        Казмунайгаз
                                    </div>
                                    <div className="info__client">
                                        <div className="logo-client">
                                            <img src="img/logo-client.png" alt="ava-manager"/>
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
                                            <img src="img/logo-client.png" alt="logo-client"/>
                                        </div>
                                        Казмунайгаз
                                    </div>
                                    <div className="info__client">
                                        <div className="logo-client">
                                            <img src="img/logo-client.png" alt="ava-manager"/>
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
        </section>

        </div>
    );
}