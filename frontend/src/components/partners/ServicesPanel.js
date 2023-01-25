import React from 'react'

import LocationIcon from "../../assets/icons/location.svg";
import StarIcon from "../../assets/icons/star.svg";
import Star from "../../assets/icons/star.svg";
import Search from "../form/Search";
import Image from "../cards/atoms/Image";
import Name from "../cards/atoms/Name";
import Rate from "../cards/atoms/Rate";
import Rooms from "../cards/atoms/Rooms";
import Address from "../cards/atoms/Address";
import Description from "../cards/atoms/Description";
import Price from "../cards/atoms/Price";

function PartnerInfo({
                         name='Название отеля',
                         address='Адрес отеля',
                         rate='4,5'}){
    return (
        <div className="partners-item__info">
            <div className="partners-item__block">
                <div className="partners-item__name">
                    {name}
                </div>
                <div className="partners-item__rate">
                    <StarIcon viewBox="0 0 24 24"/>
                    <span>{rate}</span>
                </div>
            </div>
            <div className="partners-item__right">
                <LocationIcon viewBox="0 0 24 24"/>
                <span>{address}</span>
            </div>

        </div>
    );
}

function PartnerServices({ children }){
    return (
        <div className="partners-services">
            {children}
        </div>
    );
}

function PartnerService({
                            img_url="/img/hotelimg.png",
                            name="Название номера",
                            rate="4.2",
                            rooms_num=1,
                            address="Адрес отеля",
                            price="",
                            description='Описание комнаты. Описание комнаты Описание комнаты',
                        }){
    return (
        <div className="card-item">
            {img_url && <Image img_url={img_url} />}

            <div className="card-item__info">
                {name && <Name name={name}/>}

                <div className="card-item__dopinfo">
                    {rate && <Rate rate={rate}/>}
                    {rooms_num && <Rooms rooms_num={rooms_num}/>}
                </div>

                {address && <Address address={address} />}
                {description && <Description description={description}/>}
                {/*{price && <Price price={price}/>}*/}

                <div className="card-item__price">
                    Зарина <br/>
                    +7 730 376 1222
                </div>
            </div>
        </div>
    );
}

function PartnerItem({}){
    return (
        <div className="partners-item">

            <PartnerInfo />

            <PartnerServices>

                <PartnerService />

            </PartnerServices>

        </div>
    );
}

function Tag({
                 name="Квартиры",
                 number=34,
                 active=false}){
    return (
        <div className={`tag ${active?'tag-active':''}`}>
            <div className="tag__name">{name}</div>
            <span> ({number})</span>
        </div>
    );
}

export default function ServicesFrame(){
    return (
        <div className="partners">
            <div className="partners__search">
                <Search placeholder={"Найти по названию"}/>
            </div>

            <div className="partners__category tags">
                <Tag name={"Квартиры"} number={34} active={true}/>
                <Tag name={"Отели"} number={123} active={false}/>
            </div>

            <div className="partners__wrapper">

                <PartnerItem />
                {/*<div class="partners-item">
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
                </div>*/}
            </div>

        </div>
    )
}