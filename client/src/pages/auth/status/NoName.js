import React, {useMemo, useState} from 'react';

import Logger from '../../../internal/Logger';
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../../context/AppContext";

export default function NoName({ }){

    const {authHandler} = useAppContext();
    const {assignName} = authHandler;

    const [name, setName] = useState('');

    const logger = useMemo(()=>new Logger('NoName'),[])

    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function onSetName(){
        setSuccess(null);
        setError(null);
        setLoading(true);

        assignName({ name })
            .then(json => {
                if(json.status === 200){
                    setSuccess(json);
                    setError(null);
                }
                else {
                    setError(json);
                }
            })
            .catch(e=>setError(e))
            .finally(()=>setLoading(false));
    }

    return (<>
        <h1>[No Name]</h1>

        {loading && <p>loading...</p>}
        {success && <p>{success.message}</p>}
        {error && <p>{error.message}</p>}

        <input value={name} onChange={e => setName(e.target.value)}/>
        <button onClick={onSetName}>Set name</button>

    </>);
}