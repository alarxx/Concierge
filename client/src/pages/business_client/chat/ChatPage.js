import NavbarPanel from "../../../widgets/navbar_panel/NavbarPanel";
import React, {useState} from "react";
import NavigationPanel from "../../../widgets/navigation_panel/NavigationPanel";
import Container from "../../../shared/ui/box/Container";
import Box from "../../../shared/ui/box/Box";
import Chat from "../../../widgets/chat/Chat";

export default function ChatPage(){

    const [isMessengerActive, setIsMessengerActive] = useState(false);


    return (<>
        <NavbarPanel title={'Чат'}/>

        <Box navbar={true} menu={true}>
            <Container>
                <Chat onMessengerActive={setIsMessengerActive} />
            </Container>
        </Box>

        {!isMessengerActive && <NavigationPanel />}
    </>);
};