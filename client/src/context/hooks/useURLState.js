import React, {useState} from 'react';
import {useLocation} from "react-router-dom";

/**
 * Каждый URL имеет свой state в localStorage.
 * Нужно для сохранения состояния при перезагрузке страницы.
 * */
export default function useURLState(){
    const location = useLocation();

    // Можно сделать так
    // const [state, setState] = useState(() => JSON.parse(localStorage.getItem(location.pathname));

    function setState(state){
        localStorage.setItem(location.pathname, JSON.stringify(state));
    }
    function getState(){
        const item = localStorage.getItem(location.pathname);
        return JSON.parse(item);
    }
    function clearState(){
        localStorage.removeItem(location.pathname);
    }

    return {
        // state,
        setState,
        getState,
        clearState,
    }
}