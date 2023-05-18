import React, {useEffect, useMemo, useState} from 'react';

import Logger from '../../../internal/Logger';
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../../context/AppContext";
import Button from "../../../shared/ui/button/Button";
import Input from "../../../shared/ui/input/Input";

export default function NoNameForm({ }){

    const {authHandler} = useAppContext();
    const {assignName, userError} = authHandler;

    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [phone, setPhone] = useState('');

    const logger = useMemo(()=>new Logger('NoName'),[])

    const [success, setSuccess] = useState(null);
    const [error, setError] = useState('asdf');

    async function onSetName(){
        setSuccess(null);

        try{
            const json = await assignName({ name: `${name1} ${name2}`, phone })
            logger.log("USER PHONE",json)
            if(json.status === 200){
                setSuccess(json);
                setError(null);
            }
            else {
                logger.log("USER ERROR",json)
                logger.log("USER ERROR MESSAGE",json.message)
                setError(json.message);
            }
        }catch(e){
            setError(e.message);
        }

    }

    useEffect(()=> {
        logger.log("USER ERROR EFFECT",userError)
    }, [userError])

    return (<>
        <form>
            <h1>Не хватает обязательных полей</h1>

            {success && <p>{success.message}</p>}
            {userError && <p>{userError.message}</p>}

            <label>Имя</label>
            <Input value={name1} onChange={e => setName1(e.target.value)} required/>

            <label>Фамилия</label>
            <Input value={name2} onChange={e => setName2(e.target.value)} required/>

            <label>Номер телефона</label>
            <Input value={phone} onChange={e => setPhone(e.target.value)} required/>

            <Button type={'submit'} onClick={onSetName}>Сохранить</Button>
        </form>
    </>);
}