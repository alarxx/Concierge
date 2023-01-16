import React from 'react'
import Navbar from "../../phone/Navbar";
import Container from "../../phone/Container";
import Message from "../../chat/Message";
import ControlPanel from "../../chat/ControlPanel";
import Workflow from "../../phone/Workflow";


export default function Messanger({ messages, closeChat }){
    return (
        <Workflow>
            <Navbar title={"Имя консультанта"} back info onBackClick={closeChat}/>

            <Container chat>
                <Message text={"Текст"} time={"01 : 00"} mymssg />
                <Message text={"Текст"} time={"01 : 00"} />

                {/*<Day day={"Сегодня"}/>*/}

                {/*<ChoiceForm items={hotelsDefault} onSubmit={console.log}/>*/}

                {/*<DocAttach />*/}
            </Container>


            <ControlPanel />

            {/*Menu*/}
        </Workflow>
    );
}