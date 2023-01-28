import {Link} from "react-router-dom";
import React from "react";

export default function Header({ user }){
    return (
        <header>
            <div className="container">
                <nav>
                    <div className="nav__left">
                        <div className="logo">
                            <Link to="/">
                                <img src="/img/logo.png" alt="ConciergeService"/>
                            </Link>
                        </div>
                        <ul className="menu-admin">
                            <li className="menu-admin__li"><Link to="/">Заявки</Link></li>
                            <li className="menu-admin__li menu-admin__li-active"><Link to="/">Пользователи</Link></li>
                            <li className="menu-admin__li"><Link to="/">Партнеры</Link></li>
                            <li className="menu-admin__li"><Link to="/">Направления</Link></li>
                        </ul>
                    </div>
                    <div className="user_nav dflex aic">
                        <span>{user.name}</span>
                        <div className="user_avatar">

                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}