import React, {useEffect, useMemo, useState} from "react";

import setIds from "../../internal/setIds";
import findIndexById from "../../internal/findIndexById";
import Logger from "../../internal/Logger";

export default function useFreshData({ socket, modelName }){

    const name = modelName.toLowerCase();

    const logger = useMemo(()=>new Logger(`useFreshData(${name})`),[])

    const [data, _setData] = useState([]);

    function setData(objectsToUpsert=[]){
        _setData(objectsToUpsert.map(doc => setIds(doc)));
    }

    function upsertData(objectsToUpsert=[]){
        // здесь должна быть проверка(comparing) каждого документа из массива по времени и сетить только в случае если document моложе,
        // Если такого вообще нет, то мы добавляем,
        // Еще если в новых данных нет элемента из старых, то мы удаляем его
        // На случай, если нам прилетели старые данные, а в пул уже успели прилететь новые данные
        _setData(prev => {
            const clone = [...prev];

            objectsToUpsert.map(doc => {
                setIds(doc);

                const i = findIndexById(clone, doc.id)

                if(i === -1) {
                    clone.push(doc)
                    return clone;
                } else {
                    // сетим если по времени(updatedAt) объект старше (или равен? тогда они должны быть одинаковы)
                    clone[i] = doc;
                }

            });

            // здесь нужно отсортировать? нет, потому что параметр сортировки может быть разный

            return clone;
        })
    }


    function removeData(objectsToRemove=[]){
        _setData(prev => {
            const clone = [...prev];
            // logger.log("before delete:", {data: clone})
            objectsToRemove.map(doc => {
                const i = findIndexById(prev, doc.id);
                clone.splice(i, 1);
            });
            // logger.log("after delete:", {data: clone})
            return clone;
        });
    }


    useEffect(() => {
        socket.on(`/save/${name}`, (doc) => {
            logger.log(`/save/${name}`, doc);
            if(!doc){
                return logger.error(`/save/${name}: doc is null`);
            }
            setIds(doc);
            upsertData([doc]);
        });

        socket.on(`/delete/${name}`, (doc) => {
            logger.log(`/delete/${name}`, doc);
            if(!doc){
                return logger.error(`/delete/${name}: doc is null`);
            }
            setIds(doc); // Зачем это делать, если мы все равно удаляем этот док? Нам нужен id в объекте
            removeData([doc]);
        });
    }, []);


    return ({
        data,
        setData,
        upsertData,
        removeData,
    });
}