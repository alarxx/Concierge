import React, {useCallback, useEffect, useMemo, useState} from "react";

import {useLocation, useNavigate} from "react-router-dom";

import Logger from "../../../internal/Logger";

import {loadJSON, saveJSON, removeJSON} from "../../../internal/localStorage"

export default function useLastPage(){

    const location = useLocation();
    const navigate = useNavigate();
    const logger = useMemo(() => new Logger('useLastPage'), [])

    const [lastPage, setLastPage] = useState(loadJSON('last_page'));

    function saveLastPage(){
        try{
            const url = location.pathname;
            setLastPage(url);
            saveJSON('last_page', url);
        }
        catch(e){
            logger.error(e);
        }
    }
    function clearLastPage(){
        setLastPage('')
        removeJSON('last_page');
    }
    function navigateLastPage(){
        if(!lastPage) {
            // last page может не быть, если пользователь прям в URL /authentication ввел
            logger.error('useLastPage: no last page');
            return navigate('/');
        }
        logger.log(`useLastPage: last_page: ${lastPage}`)
        clearLastPage();
        return navigate(lastPage, { replace:true });
    }

    useEffect(()=>{
        logger.log("useLastPage first: ", lastPage)
    }, [lastPage])

    return { lastPage, saveLastPage, clearLastPage, navigateLastPage }

}