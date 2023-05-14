import React, {useState} from "react";

export default function useNotifications() {

    const [notifications, setNotifications] = useState([]);

    function push(notification) {
        setNotifications(prev => [...prev, notification]);
    }

    return ({notifications, push});
}