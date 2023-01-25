import React from 'react'

import LocationIcon from "../../assets/icons/location.svg";
import StarIcon from "../../assets/icons/star.svg";
import Search from "../form/Search";
import CardItem from "../cards/CardItem";

function PartnerInfo({
                         name='Название отеля',
                         address='Адрес отеля',
                         rate=4.5}){
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


// hotel.services мы должны будем добавлять на фронте. hotels и services мы должны будем в контексте соотнести и присвоить отелям массив services
// Мы должны будем все сервисы прислать в контекст раскрытыми или нет. Долго ли populate-ить? Или нам легче отправить и отели и сервисы и на фронте их как то за-compare-ить
const offices = [
    {
        "id": "63d16cdb63463dbeb41dc690",
        "type": "hotel",
        "hotel": {
            "id": "63d16cdb63463dbeb41dc68f",
            "office":"63d16cdb63463dbeb41dc690",
            "name": "Отель компании 1",
            "logo": "id of file or null",
            "services": [

            ],
        }
    },
];

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