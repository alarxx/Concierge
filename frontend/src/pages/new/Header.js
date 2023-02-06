import {Link} from "react-router-dom";
import React from "react";

export default function Header({ user, isAuthenticated=f=>false, pageName }){
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

                        {isAuthenticated() && user.role === 'manager' && 
                        <ul className="menu-admin">
                            <li className={`menu-admin__li ${pageName == "orders" ? "menu-admin__li-active" : "" }`}><Link to="/admin/orders">Заявки</Link></li>
                            <li className={`menu-admin__li ${pageName == "users" ? "menu-admin__li-active" : "" }`}><Link to="/admin">Пользователи</Link></li>
                            <li className={`menu-admin__li ${pageName == "partners" ? "menu-admin__li-active" : "" }`}><Link to="/admin/partners">Партнеры</Link></li>
                            <li className={`menu-admin__li ${pageName == "flightracker" ? "menu-admin__li-active" : "" }`}><Link to="/admin/flightracker">Направления</Link></li>
                        </ul>}

                    </div>

                    {isAuthenticated() &&
                    <div className="user_nav dflex aic">
                        <span>{user.name}</span>
                        <div className="user_avatar">

                        </div>
                    </div>}

                </nav>
            </div>
        </header>
    );
}