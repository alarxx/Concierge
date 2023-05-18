import React, {useMemo, useState} from 'react';

import Logger from '../../../internal/Logger';
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../../context/AppContext";

export default function NoName({ }){

    const {authHandler} = useAppContext();
    const {assignName} = authHandler;

    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [phone, setPhone] = useState('');

    const logger = useMemo(()=>new Logger('NoName'),[])

    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function onSetName(){
        setSuccess(null);
        setError(null);
        setLoading(true);

        assignName({ name: `${name1} ${name2}`, phone })
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
        <h1>Не хватает обязательных полей</h1>

        {loading && <p>loading...</p>}
        {success && <p>{success.message}</p>}
        {error && <p>{error.message}</p>}

        <label>Имя</label>
        <input value={name1} onChange={e => setName1(e.target.value)} required/>

        <label>Фамилия</label>
        <input value={name2} onChange={e => setName2(e.target.value)} required/>

        <label>Номер телефона</label>
        <input value={phone} onChange={e => setPhone(e.target.value)} required/>

        <button onClick={onSetName}>Set name</button>

    </>);
}