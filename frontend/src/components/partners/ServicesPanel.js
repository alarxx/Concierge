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
import Contacts from "../cards/atoms/Contacts";
import CardItem from "../cards/CardItem";

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

function PartnerItem({ office, services }){
    const measuring = "Т / ночь";
    return (
        <div className="partners-item">

            <PartnerInfo />

            <PartnerServices>

                <CardItem
                    name={"Название номера"}
                    img_url={"/img/hotelimg.png"}
                    rate={4.2}
                    description={`Цена: ${10000} ${measuring}`}

                    rooms_num={1}

                    contact_name="Зарина"
                    contact_phone="+7 730 376 1222"

                    active={false}
                    onClick={f=>f}
                />

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

export default function ServicesFrame({ offices=[] }){
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

                {/* Вот так должно быть, если мы подключим бэкенд.  */}
                {/*{offices.map(
                    office => (
                            <PartnerItem office={office}
                                         services={office.services}
                                         preferred_services={order.meta.preferred_service}
                            />
                        )
                )}*/}
                <PartnerItem />

            </div>

        </div>
    )
}