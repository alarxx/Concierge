import React, {useEffect, useState} from "react";
import setIds from "../handlers/setIds";
import findIndexById from "../handlers/findIndexById";

export default function useFreshData({ socket, modelName }){
    const name = modelName.toLowerCase();

    const [data, setData] = useState([]);

    function _upsertDoc(doc){
        setIds(doc);

        console.log(`/save/${name}`, doc);

        setData(prev => {
            const clone = [...prev]

            const i = findIndexById(clone, doc.id)

            if(i === -1) {
                clone.push(doc)
                return clone;
            } else {
                clone[i] = doc;
            }

            return clone;
        });
    }
    function _removeDoc(doc){
        // Зачем это делать, если мы все равно удаляем этот док
        doc.id = doc._id;
        delete doc._id;

        console.log(`/delete/${name}`, doc);

        setData(prev => {
            const i = findIndexById(prev, doc.id)
            const clone = [...prev]
            clone.splice(i, 1);
            return clone;
        })
    }

    useEffect(() => {
        socket.on(`/save/${name}`, (doc) => {
            _upsertDoc(doc);
        });
        socket.on(`/delete/${name}`, (doc) => {
            _removeDoc(doc);
        });
    }, []);

    function updateData(data){
        // здесь должна быть проверка(comparing) каждого документа из массива по времени и сетить только в случае если document моложе,
        // Если такого вообще нет, то мы добавляем,
        // Еще если в новых данных нет элемента из старых, то мы удаляем его
        // На случай, если нам прилетели старые данные, а в пул уже успели прилететь новые данные
        setData(data);
    }

    return [data, setData, updateData, _upsertDoc, _removeDoc];
}