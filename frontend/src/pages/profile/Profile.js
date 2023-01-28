import React from 'react'

import Workflow from "../../components/phone/Workflow";
import Menu from "../../components/phone/Menu";
import Container from "../../components/phone/Container";
import CardOrder from "../../components/cards/CardOrder";
import PushIcon from "../../assets/icons/clipboard-tick.svg";
import {useAppContext} from "../../context/AppContext";
import {useNavigate} from "react-router-dom";


export default function Profile(){

    const navigate = useNavigate();

    const { ordersHandler, chatHandler, authHandler } = useAppContext();
    const { orders, updateOrder } = ordersHandler;
    const { joinConversation } = chatHandler;
    const { user } = authHandler;

    return (
        <Workflow>

            <Container>

                <div className='profile_content'>
                    <div className="profile__person">
                        <div className="profile__hello">
                            Здравствуйте, <br/>
                            <span>{user.name}!</span>
                        </div>
                        <div className="profile__avatar">
                            {/* <!-- <img src="" alt=""> --> */}
                        </div>
                    </div>

                    <div className="profile__stats stats">
                        <div className="stats__block">
                            <div className="stats__num">{orders.length}</div>
                            <div className="stats__category">Заявок</div>
                        </div>
                        <div className="stats__block">
                            <div className="stats__num">4</div>
                            <div className="stats__category">Договоров</div>
                        </div>
                        <div className="stats__block">
                            <div className="stats__num">24 M</div>
                            <div className="stats__category">Заработано</div>
                        </div>
                    </div>

                    <div className="profile__pushs">
                        <div className="push">
                            <div className="push__icon">
                                <PushIcon />
                                    
                            </div>
                            <div className="push__info">
                                <div className="push__title">На сегодня</div>
                                <div className="push__descr">Заселение в 7 часов в отель Бондюор</div>
                            </div>
                        </div>
                        <div className="push">
                            <div className="push__icon">
                                <PushIcon />
                                    
                            </div>
                            <div className="push__info">
                                <div className="push__title">На сегодня</div>
                                <div className="push__descr">Заселение в 7 часов в отель Бондюор</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="cards">
                        <div className="cards__title">
                            {user.role !== 'manager' ? 'Мои заявки' : 'Новые заявки'}
                        </div>

                        {orders.map((order, i) => {
                            if(user.role !== 'manager' || order.status == 'new') {
                                return (
                                    <CardOrder
                                        key={i}
                                        order={order}
                                        onClick={e => {
                                            joinConversation({id: order.conversation});
                                            updateOrder({id: order.id, status: 'handling'});
                                            setTimeout(()=>navigate('/chat'), 500);
                                        }}
                                    />
                                )
                            }
                        })}
                    </div>
                </div>

            </Container>

            <Menu />

        </Workflow>
    )
}