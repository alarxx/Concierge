import React from 'react'

import LocationIcon from "../../assets/icons/location.svg";
import StarIcon from "../../assets/icons/star.svg";


export default function ServicesFrame(){
    return (
        <div class="partners">
            <div class="partners__search">
                <div class="search">
                    <input type="text" class="search-input" placeholder="Найти по названию"/>
                    <span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M22 22L20 20" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>                            
                    </span>
                </div>
            </div>
            <div class="partners__category tags">
                <div class="tag tag-active">
                    <div class="tag__name">Квартиры</div>
                    <span> (34)</span>
                </div>
                <div class="tag">
                    <div class="tag__name">Отели</div>
                    <span> (123)</span>
                </div>
            </div>
            <div class="partners__wrapper">
                <div class="partners-item">
                    <div class="partners-item__info">
                        <div class="partners-item__block">
                            <div class="partners-item__name">
                                Названи отеля
                            </div>
                            <div class="partners-item__rate">
                                <StarIcon viewBox="0 0 24 24" />                                <span>4,5</span>
                            </div>
                        </div>
                        <div class="partners-item__right">
                            <LocationIcon viewBox="0 0 24 24" />
                            <span>Адрес отеля</span>
                        </div>
                    </div>
                    <div class="partners-services">
                        <div class="card-item">
                            <div class="card-item__img">
                                <img src="img/hotelimg.png" alt="room image"/>
                            </div>
                            <div class="card-item__info">
                                <div class="card-item__name">
                                    Название отеля
                                </div>
                                <div class="card-item__dopinfo">
                                    <div class="card-item__rate">
                                        <span>
                                            <img src="img/star.png" alt=""/>
                                        </span>
                                        4.2
                                    </div>
                                    <div class="card-item__rooms">Комнат: <span class="roomsnum">1</span></div>
                                </div>
                                <div class="card-item__address">
                                    <span>
                                        <svg width="15" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.9999 13.4299C13.723 13.4299 15.1199 12.0331 15.1199 10.3099C15.1199 8.58681 13.723 7.18994 11.9999 7.18994C10.2768 7.18994 8.87988 8.58681 8.87988 10.3099C8.87988 12.0331 10.2768 13.4299 11.9999 13.4299Z" stroke="#292D32" stroke-width="1.5"/>
                                            <path d="M3.61995 8.49C5.58995 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.38995 20.54C5.62995 17.88 2.46995 13.57 3.61995 8.49Z" stroke="#292D32" stroke-width="1.5"/>
                                        </svg>
                                    </span>
                                    Адрес отеля
                                </div>
                                <div class="card-item__descr">
                                    Описание комнаты. Описание комнаты Описание комнаты 
                                </div>
                                <div class="card-item__price">
                                    Зарина <br/> 
                                    +7 730 376 1222
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}