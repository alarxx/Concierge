import React, {useEffect, useMemo, useState} from 'react';

import Logger from '../../../internal/Logger';
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../../context/AppContext";
import Button from "../../../shared/ui/button/Button";
import Input from "../../../shared/ui/input/Input";
import fetchJSON from "../../../internal/fetchJSON";

export default function NoNameForm({ }){

    const navigate = useNavigate();

    const {authHandler} = useAppContext();
    const {user} = authHandler;

    const [name1, setName1] = useState(user.name.split(" ")[0]);
    const [name2, setName2] = useState(user.name.split(" ")[1]);
    const [phone, setPhone] = useState(user.phone);

    const logger = useMemo(()=>new Logger('NoName'),[])

    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function onSetName(e){
        e.preventDefault();

        setSuccess(null);
        setError(null);
        setLoading(true);

        const response = await fetch('/auth/name', {
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: "PATCH",
            body: JSON.stringify({ name:`${name1} ${name2}`, phone })
        });

        const json = await response.json();

        if(response.status === 200){
            setSuccess(json);
            setError(null);
            navigate('/');
        }
        else {
            logger.log("USER ERROR",json)
            logger.log("USER ERROR MESSAGE",json.message)
            setError(json);
        }

        setLoading(false)

    }

    useEffect(()=> {
        logger.log("USER ERROR EFFECT", error);
    }, [error])

    return (<>
        <form onSubmit={onSetName}>
            <h1>Не хватает обязательных полей</h1>

            {success && <p>{success.message}</p>}
            {error && <p>{JSON.stringify(error.errors)}</p>}
            {loading && <p>loading...</p>}

            <label>Имя</label>
            <Input value={name1} onChange={e => setName1(e.target.value)} required/>

            <label>Фамилия</label>
            <Input value={name2} onChange={e => setName2(e.target.value)} required/>

            <label>Номер телефона</label>
            <Input type="number" value={phone} onChange={e => setPhone(e.target.value)} required/>

            <Button type={'submit'} >Сохранить</Button>
        </form>
    </>);
}