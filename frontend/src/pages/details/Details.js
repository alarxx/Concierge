import React from 'react';
import Workflow from "../../components/phone/Workflow";
import Container from "../../components/phone/Container";
import Navbar from "../../components/phone/Navbar";
import {useNavigate} from "react-router-dom";

export default function Details({}){
    const navigate = useNavigate()

    return (
        <Workflow>

            <Navbar title={"Детали командировки"} back info onBackClick={e=>navigate(-1)}/>
            <Container>
                    <div className="details-card">
                        <div className="details-card__header">
                            <div className="details-card__title">
                                Отель Делавре
                            </div>
                            <div className="details-card__more">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3.25 10.0002C3.25 9.49771 3.66421 9.0835 4.16667 9.0835C4.66912 9.0835 5.08333 9.49771 5.08333 10.0002C5.08333 10.5026 4.66912 10.9168 4.16667 10.9168C3.66421 10.9168 3.25 10.5026 3.25 10.0002Z"
                                        stroke="#292D32" stroke-width="1.5"/>
                                    <path
                                        d="M14.9167 10.0002C14.9167 9.49771 15.331 9.0835 15.8334 9.0835C16.3359 9.0835 16.7501 9.49771 16.7501 10.0002C16.7501 10.5026 16.3359 10.9168 15.8334 10.9168C15.331 10.9168 14.9167 10.5026 14.9167 10.0002Z"
                                        stroke="#292D32" stroke-width="1.5"/>
                                    <path
                                        d="M9.08325 10.0002C9.08325 9.49771 9.49747 9.0835 9.99992 9.0835C10.5024 9.0835 10.9166 9.49771 10.9166 10.0002C10.9166 10.5026 10.5024 10.9168 9.99992 10.9168C9.49747 10.9168 9.08325 10.5026 9.08325 10.0002Z"
                                        stroke="#292D32" stroke-width="1.5"/>
                                </svg>
                            </div>
                        </div>
                        <div className="details-card__body">
                            <div className="card-item__img"
                                 style={{background:"url('img/hotelimg.png') center center/cover no-repeat"}}>
                            </div>
                            <div className="card-item__info">
                                <div className="card-item__dopinfo">
                                    <div className="card-item__rate">
                                    <span>
                                        <img src="img/star.png" alt=""/>
                                    </span>
                                        4.2
                                    </div>
                                    <div className="card-item__rooms">Комнат: <span className="roomsnum">1</span></div>
                                </div>
                                <div className="card-item__address">
                                <span>
                                    <svg width="15" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.9999 13.4299C13.723 13.4299 15.1199 12.0331 15.1199 10.3099C15.1199 8.58681 13.723 7.18994 11.9999 7.18994C10.2768 7.18994 8.87988 8.58681 8.87988 10.3099C8.87988 12.0331 10.2768 13.4299 11.9999 13.4299Z"
                                            stroke="#292D32" stroke-width="1.5"/>
                                        <path
                                            d="M3.61995 8.49C5.58995 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.38995 20.54C5.62995 17.88 2.46995 13.57 3.61995 8.49Z"
                                            stroke="#292D32" stroke-width="1.5"/>
                                    </svg>
                                </span>
                                    Адрес отеля
                                </div>
                                <div className="card-item__descr">
                                    Описание комнаты. Описание комнаты Описание комнаты
                                </div>
                                <div className="card-item__price">
                                    10 000 Т / ночь
                                </div>
                            </div>
                        </div>
                        <div className="details-card__footer">
                            <span>Всего: 123 000 Т</span>
                        </div>
                    </div>
                    <div className="details-card">
                        <div className="details-card__header">
                            <div className="details-card__title">
                                Отель Делавре
                            </div>
                            <div className="details-card__more">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3.25 10.0002C3.25 9.49771 3.66421 9.0835 4.16667 9.0835C4.66912 9.0835 5.08333 9.49771 5.08333 10.0002C5.08333 10.5026 4.66912 10.9168 4.16667 10.9168C3.66421 10.9168 3.25 10.5026 3.25 10.0002Z"
                                        stroke="#292D32" stroke-width="1.5"/>
                                    <path
                                        d="M14.9167 10.0002C14.9167 9.49771 15.331 9.0835 15.8334 9.0835C16.3359 9.0835 16.7501 9.49771 16.7501 10.0002C16.7501 10.5026 16.3359 10.9168 15.8334 10.9168C15.331 10.9168 14.9167 10.5026 14.9167 10.0002Z"
                                        stroke="#292D32" stroke-width="1.5"/>
                                    <path
                                        d="M9.08325 10.0002C9.08325 9.49771 9.49747 9.0835 9.99992 9.0835C10.5024 9.0835 10.9166 9.49771 10.9166 10.0002C10.9166 10.5026 10.5024 10.9168 9.99992 10.9168C9.49747 10.9168 9.08325 10.5026 9.08325 10.0002Z"
                                        stroke="#292D32" stroke-width="1.5"/>
                                </svg>
                            </div>
                        </div>
                        <div className="details-card__body">
                            <div className="details-card__executor">
                                Исполнитель: ТОО “Тойбастар”
                            </div>
                            <div className="details-card__number">
                                +7 703 738 2777
                            </div>
                            <div className="details-card__descr">
                                Описание услуги, которую окажут
                            </div>
                        </div>
                        <div className="details-card__footer">
                            Всего: 123 000 Т
                        </div>
                    </div>
                    <div className="details-card details-card-comment">
                        <div className="details-card__header">
                            <div className="details-card__title">
                                Комментарии
                            </div>
                            <div className="details-card__more">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3.25 10.0002C3.25 9.49771 3.66421 9.0835 4.16667 9.0835C4.66912 9.0835 5.08333 9.49771 5.08333 10.0002C5.08333 10.5026 4.66912 10.9168 4.16667 10.9168C3.66421 10.9168 3.25 10.5026 3.25 10.0002Z"
                                        stroke="#292D32" stroke-width="1.5"/>
                                    <path
                                        d="M14.9167 10.0002C14.9167 9.49771 15.331 9.0835 15.8334 9.0835C16.3359 9.0835 16.7501 9.49771 16.7501 10.0002C16.7501 10.5026 16.3359 10.9168 15.8334 10.9168C15.331 10.9168 14.9167 10.5026 14.9167 10.0002Z"
                                        stroke="#292D32" stroke-width="1.5"/>
                                    <path
                                        d="M9.08325 10.0002C9.08325 9.49771 9.49747 9.0835 9.99992 9.0835C10.5024 9.0835 10.9166 9.49771 10.9166 10.0002C10.9166 10.5026 10.5024 10.9168 9.99992 10.9168C9.49747 10.9168 9.08325 10.5026 9.08325 10.0002Z"
                                        stroke="#292D32" stroke-width="1.5"/>
                                </svg>
                            </div>
                        </div>
                        <div className="details-card__body">
                            <div className="details-card__descr">
                                Дополнительные комментарии, которые задает клиент
                            </div>
                        </div>
                    </div>
            </Container>
        </Workflow>
    )
}