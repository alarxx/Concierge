import React, {useEffect, useState} from 'react';
import setIds from "../../../handlers/setIds";
import findIndexById from "../../../handlers/findIndexById";
import useFreshData from "../../../hooks/useFreshData";


function log(...str){
    // console.log("useOffice:", ...str);
}

/**
 * Загрузка и поддержка офисов в актуальном состоянии. Функция нужна в большей степени для менеджера.
 * */
export default function useOffice({authHandler, socketHandler}){
    const { user, isAuthenticated } = authHandler;
    const { socket, isConnected } = socketHandler;

    const [officesLoading, setOfficesLoading] = useState(true);
    const [officesError, setOfficesError] = useState(null);

    const [offices, setOffices, updateOffices] = useFreshData({socket, modelName:'Office'});

    /* Думаю что и preload можно вынести в userFreshData, тогда вообще легко будет создавать авто-обновляемые данные */
    async function preload(){
        setOfficesLoading(true);

        try{
            const res = await fetch('/api/office');
            const json = await res.json();
            if(res.status === 200){
                log("success", json);
                updateOffices(setIds(json));
            }
            else{
                log("error", json);
                setOfficesError(json);
            }
        }
        catch (err){
            log("error", err);
            setOfficesError(err);
        }

        setOfficesLoading(false)
    }

    useEffect(()=>{
        if(isAuthenticated()){
            if(user.role!=='manager') return; // Чтобы не нагружать клиент пользователя. Ему все равно бэкенд вернет ошибку

            preload();
        }
        else {
            // Как понять, что до этого мы были авторизованы
            if(offices.length){
                log([]);
                setOffices([])
            }
            // setOfficesLoading(false)
        }
    }, [user])

    return {offices}
}