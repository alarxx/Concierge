import React, {useEffect, useState} from 'react';

export default function useAuth(){
    const [user, setUser] = useState();
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState();

    const userFetch = (url, opt={}) => {
        (async ()=>{
            setUserLoading(true);
            try{
                if(opt.body && typeof opt.body !== 'string')
                    opt.body = JSON.stringify(opt.body);

                const res = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    ...opt
                });
                const user = await res.json();
                console.log(user)
                setUserLoading(false);
                setUserError(null);
                setUser(user);
            }catch (err){
                setUserLoading(false);
                setUserError(err.message);
            }
        })();
    }

    const login = (body) => userFetch('/auth/login', {method: 'POST', body})

    const register = (body) => userFetch('/auth/register', {method: 'POST', body})

    const check = () => userFetch('/auth')

    const logout = () => userFetch('/auth/logout', {method: 'DELETE'})

    useEffect(()=>{
        check();
    }, [])

    return {
        user, userLoading, userError,
        login,
        register,
        check,
        logout
    };
}
