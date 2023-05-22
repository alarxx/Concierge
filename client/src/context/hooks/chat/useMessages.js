import React, {useEffect, useMemo, useState} from "react";

import * as uuid from "uuid";

import setIds from "../../../internal/setIds";
import Logger from "../../../internal/Logger";




/**
 * При отправке сообщение должно сразу добавляться в массив сообщений с полями message_id=uuid, isSent=false.
 *
 * */
export default function useMessages({ socketHandler, authHandler }){

    const name = 'message';

    const logger = useMemo(()=>new Logger(`useMessages`),[])

    const {user} = authHandler;
    const {socket, isConnected} = socketHandler;

    const [messages, _setMessages] = useState([]);

    function setMessages(objectsToSet=[]){
        _setMessages(objectsToSet.map(doc => {
            setIds(doc);
            doc.isDelivered = Boolean(doc.id);
            return doc;
        }));
    }

    function upsertMessages(objectsToUpsert=[]){
        /**
         * Здесь должна быть проверка не по стантартному id, а по сгенери-ному на фронте uuid.
         * Если такого вообще нет, то мы добавляем.
         */

        _setMessages(prev => {
            const clone = [...prev];

            objectsToUpsert.map(doc => {
                setIds(doc);
                doc.isDelivered = Boolean(doc.id);

                const i = clone.findIndex(msg => msg.message_id === doc.message_id);

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


    function removeMessages(objectsToRemove=[]){
        _setMessages(prev => {
            const clone = [...prev];
            // logger.log("before delete:", {data: clone})
            objectsToRemove.map(doc => {
                const i = clone.findIndex(msg => msg.message_id === doc.message_id);
                if(i === -1) {
                    return;
                }
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
            upsertMessages([doc]);
        });

        socket.on(`/upsert/${name}`, (docs) => {
            logger.log(`/upsert/${name}`, docs);
            if(!docs){
                return logger.error(`/upsert/${name}: docs is null`);
            }
            upsertMessages(docs);
        });

        socket.on(`/delete/${name}`, (doc) => {
            logger.log(`/delete/${name}`, doc);
            if(!doc){
                return logger.error(`/delete/${name}: doc is null`);
            }
            removeMessages([doc]);
        });
    }, []);



    function _sendMessageAPI(message){
        const formData = new FormData();
        formData.append('conversation', message.conversation);
        formData.append('type', message.type);
        // logger.log('FILE NAME', message.file);
        // selectedFile.name = encodeURIComponent(selectedFile.name);
        formData.append(message.type, message[message.type]);
        formData.append('message_id', message.message_id);
        formData.append('file_name', message.file_name);

        fetch('/api/chat/message/send', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                console.log('_sendMessageAPI: File response', response);
                // Handle server response
            })
            .catch(error => {
                // Handle upload error
                console.log('_sendMessageAPI: File error', error);
            });
    }

    /**
     * message - объект, который содержит {
     *     conversation: ObjectId of Conversation,
     *     sender: ObjectId of User,
     *     type: String from enum['text', 'file', 'image'],
     *     [type='text']: 'Hello, World!',
     * }
     * для отправки достаточно полей conversation, type и [type].
     * */
    function sendMessage(message){
        if(!message.type || !message.conversation){
            logger.error("sendMessage", "'type' and 'conversation' are required fields");
        }

        message.message_id = uuid.v4();
        message.sender = user.id; //'645e7594864709d8b09357a7';
        message.createdAt = new Date(); //Date Sun May 21 2023 02:55:41 GMT+0600 (Бангладеш, стандартное время)

        message.isDelivered = false; // это поле не сохраняется в БД, так как само наличие сообщения там означает, что оно доставленное.

        logger.log("sendMessage", {message});

        upsertMessages([message]);

        if(message.type === 'text'){
            socket.emit("send-message", message);
        }
        else if(message.type === 'file' || message.type === 'image'){
            _sendMessageAPI(message);
        }
    }


    return ({
        messages,
        setMessages,
        sendMessage
    });
}