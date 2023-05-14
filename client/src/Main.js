import React from 'react';
import {useAppContext} from "./context/AppContext";
import Router from "./Router";

export default function Main(){
    const { notificationsHandler } = useAppContext();
    const { notifications } = notificationsHandler;
    return (<>
        {/*{_isModalOpened && <_Content />}*/}
        <Router />
    </>);
}