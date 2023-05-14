import React, {useEffect, useMemo, useState} from 'react';
import Logger from "../../../internal/Logger";
import setIds from "../../../internal/setIds";

export default function useTyping({ socket, conversations }){
    const logger = useMemo(()=>new Logger('useTyping'),[])

    // Можно отлавливать изменения conversations и на каждый conversation держать пустой массив? либо просто пусто, чтобы память не тратить
    const [typingTo, setTypingTo] = useState({}); // { [conversation.id]: [...users], }

    useEffect(() => {
        // Ловим событие и прекращаем его через некоторое время
        /*socket.on(`/save/${name}`, (doc) => {
            setIds(doc);
            logger.log(`/save/${name}`, doc);
            upsertData([doc]);
        });
        socket.on(`/delete/${name}`, (doc) => {
            // Зачем это делать, если мы все равно удаляем этот док
            setIds(doc);
            logger.log(`/delete/${name}`, doc);
            removeData([doc])
        });*/
    }, []);

    function type(conversation){
        // отправляем события о печати
        // socket.emit("send-message", message);
    }

    return ({
        typingTo,
        type,
    });
}