import React, {useState} from 'react'
import Navbar from "../../phone/Navbar";
import Container from "../../phone/Container";
import Message from "../../chat/Message";
import ControlPanel from "../../chat/ControlPanel";
import Workflow from "../../phone/Workflow";
import Day from "../../chat/Day";
import ChoiceForm from "../../chat/ChoiceForm";
import DocAttach from "../../chat/DocAttach";
import InputPanel from "../../chat/InputPanel";
import ChoicePanel from "../../chat/ChoicePanel";

const hotelsDefault = [
    {
        service: 1,
        img_url: "/img/hotelimg.png",
        name: "Название",
        description: "Описание описание описание описание описание",
        price: "10 000",
        address: "Адрес",
        rate: "4.2"
    },
    {
        service: 2,
        img_url: "/img/hotelimg.png",
        name: "Название",
        description: "Описание описание описание описание описание",
        price: "10 000",
        address: "Адрес",
        rate: "4.2"
    },
    {
        service: 3,
        img_url: "/img/hotelimg.png",
        name: "Название",
        description: "Описание описание описание описание описание",
        price: "10 000",
        address: "Адрес",
        rate: "4.2"
    }
]

export default function Messanger({ messages, closeChat, onSend=console.log, onChoice=f=>f }){
    //message: {type=form, id, items, selected} должно быть так
    const [selected, setSelected] = useState([]);

    return (
        <Workflow>
            <Navbar title={"Имя консультанта"} back info onBackClick={closeChat}/>

            <Container chat>
                <Message text={"Текст"} time={"01 : 00"} mymssg />
                <Message text={"Текст"} time={"01 : 04"} />
                <Message text={"Текст"} time={"01 : 04"} />
                <Message text={"Текст"} time={"01 : 04"} />

                <Day day={"Сегодня"}/>


                <ChoiceForm items={hotelsDefault} selected={selected} setSelected={setSelected}/>

                <DocAttach />
            </Container>

            {selected.length===0 && <InputPanel onSend={onSend}/>}
            {selected.length!==0 && <ChoicePanel onClick={f=>f}/>}

            {/* Menu */}
        </Workflow>
    );
}