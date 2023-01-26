import React, {useEffect, useState} from 'react'

import LocationIcon from "../../assets/icons/location.svg";
import StarIcon from "../../assets/icons/star.svg";
import Search from "../form/Search";
import CardItem from "../cards/CardItem";
import {useAppContext} from "../../context/AppContext";
import useOffice from "../../context/hooks/data/useOffice";

/*
name='Название отеля',
address='Адрес отеля',
rate=4.5
*/
function PartnerInfo({
                         name,
                         address,
                         rate
}){
    return (
        <div className="partners-item__info">
            <div className="partners-item__block">
                {name && <div className="partners-item__name">
                    {name}
                </div>}
                {rate && <div className="partners-item__rate">
                    <StarIcon viewBox="0 0 24 24"/>
                    <span>{rate}</span>
                </div>}
            </div>
            {address && <div className="partners-item__right">
                <LocationIcon viewBox="0 0 24 24"/>
                <span>{address}</span>
            </div>}
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

function PartnerItem({ office, services, onSelect=f=>f, selected=[] }){

    /*useEffect(()=>{
        console.log("office", office);
        console.log("services", services);
    }, [office, services])*/

    const measuring = "Т / ночь";

    const hotel = office[office.type]

    return (
        <div className="partners-item">

            <PartnerInfo name={hotel.name} rate={hotel.rate} address={hotel.address}/>

            <PartnerServices>

                {services.map((service, index) => {

                    const room = service[service.type];

                    return (
                        <CardItem
                            key={index}
                            name={room.name}
                            img_url={room.logo}
                            rate={room.rate}
                            description={room.price?`Цена: ${room.price} ${measuring}`:null}

                            rooms_num={room.rooms_num}

                            contact_name={room.contact_name}
                            contact_phone={room.contact_phone}

                            active={selected.includes(service.id)}
                            onClick={e => onSelect(service)}
                        />
                    );
                })}

            </PartnerServices>

        </div>
    );
}

/*
name="Квартиры",
number=34,
active=false
*/
function Tag({
                 name,
                 number,
                 active
}){
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

export default function ServicesFrame({
                                          onSubmit=f=>console.log(f)
}){ //Why not ServicePanel

    const { officesHandler, servicesHandler } = useAppContext();

    const { offices } = officesHandler;
    const { services } = servicesHandler;

    const [selected, setSelected] = useState([]);

    function upsertSelected(value){
        const clone = [...selected];

        const index = clone.indexOf(value);

        if(index === -1)
            clone.push(value);
        else
            clone.splice(index, 1);

        setSelected(clone)
    }

    function onSelect(service){
        upsertSelected(service.id);
    }

    return (
        <div className="partners">

            <div className="partners__search">
                <Search placeholder={"Найти по названию"}/>
            </div>

            <div className="partners__category tags">
                <Tag name={"Квартиры"} number={123} active={false}/>
                <Tag name={"Отели"} number={services.filter(s => s.type === 'hotel/service').length} active={true}/>
            </div>

            {selected.length>0 && <button onClick={e => onSubmit(selected)}>Отправить</button>}

            <div className="partners__wrapper">

                {/* Вот так должно быть, если мы подключим бэкенд.  */}
                {offices.map(
                    (office, index) => (
                            <PartnerItem key={index}
                                         office={office}
                                         services={services.filter(service => service.office == office.id)}
                                         onSelect={onSelect}
                                         selected={selected}
                            />
                        )
                )}

                {/*<PartnerItem />*/}

            </div>

        </div>
    )
}