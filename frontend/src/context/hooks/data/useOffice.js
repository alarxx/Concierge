import React, {useEffect, useState} from 'react';
import setIds from "../../../handlers/setIds";
import findIndexById from "../../../handlers/findIndexById";
import useFreshData from "../../../hooks/useFreshData";


function log(...str){
    console.log("useEffect:", ...str);
}

/**
 * Загрузка и поддержка офисов в актуальном состоянии. Функция нужна в большей степени для менеджера.
 * */
export default function useOffice({authHandler, socketHandler}){
    const { user, isAuthenticated } = authHandler;
    const { socket, isConnected } = socketHandler;

    const [officeLoading, setOfficeLoading] = useState(true);

    const [offices, setOffices, updateOffices, _upsertOffice, _removeOffice] = useFreshData({socket, modelName:'Office'});

    async function preload(){
        try{
            setChatLoading(true);
            const res = await fetch('/api/chat');
            const json = await res.json();
            if(res.status === 200){
                log(json);
                updateOffices(setIds(json.messages));
            }
        }
        catch (err){
            log(err);
        }
        setChatLoading(false)
    }

    useEffect(()=>{
        if(isAuthenticated()){
            preload();
        }
        else {
            // Как понять, что до этого мы были авторизованы
            if(messages.length || conversations.length || participants.length || notifications.length){
                // log("chat:", null);
                setConversations([])
                setMessages([])
                setNotifications([])
                setParticipants([])
            }
            setChatLoading(false)
        }
    }, [user])

    return {offices}
}