import React, {useEffect, useState} from 'react';

import setIds from "../../../handlers/setIds";
import useFreshData from "../../../hooks/useFreshData";


function log(...str){
    console.log("useService:", ...str);
}

/**
 * Загрузка и поддержка офисов в актуальном состоянии. Функция нужна в большей степени для менеджера.
 * */
export default function useService({authHandler, socketHandler}){
    const { user, isAuthenticated } = authHandler;
    const { socket, isConnected } = socketHandler;

    const [servicesLoading, setServicesLoading] = useState(true);
    const [servicesError, setServicesError] = useState(null);

    const [services, setServices, updateServices] = useFreshData({socket, modelName:'Service'});

    /* Думаю что и preload можно вынести в userFreshData, тогда вообще легко будет создавать авто-обновляемые данные */
    async function preload(){
        setServicesLoading(true);

        try{
            const res = await fetch('/api/service');
            const json = await res.json();
            if(res.status === 200){
                log("success", json);
                updateServices(setIds(json));
            }
            else{
                log("error", json);
                setServicesError(json);
            }
        }
        catch (err){
            log("error", err);
            setServicesError(err);
        }

        setServicesLoading(false)
    }

    useEffect(()=>{
        if(isAuthenticated()){
            if(user.role!=='manager') return; // Чтобы не нагружать клиент пользователя. Ему все равно бэкенд вернет ошибку

            preload();
        }
        else {
            // Как понять, что до этого мы были авторизованы
            if(services.length){
                log([]);
                setServices([])
            }
            // setOfficesLoading(false)
        }
    }, [user])

    return {services}
}