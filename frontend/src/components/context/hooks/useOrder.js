import React, {useState} from 'react'

/**
 * Должен предоставлять все функции для загрузки всех ордеров, создания нового, удаления, изменения,
 * */
export default function useOrder(socket){
    const [orders, setOrders] = useState();
    const [ordersLoading, setUserLoading] = useState(true);
    const [ordersError, setUserError] = useState();

    const ordersFetch = (url, opt={}) => {
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

    return {};
}