import React, {useState} from 'react';

export default function useHotel({ socketHandler }){
    const [hotels, setHotels] = useState({}); // {id1: {isLoading, city, name}, id2: {isLoading, city, name}}

    async function loadHotel(id){
        const response = await fetch(`/api/hotel/${id}`);
        const json = await response.json();
        setHotels(prev => ({
                ...prev,
                [id]: json
            })
        );
    }

    function getHotel(id){
        const exist = Boolean(hotels[id]);
        if(!exist){
            loadHotel(id);
        }
        return ({
            isLoading: !exist,
            ...hotels[id]
        });
    }

    return ({
        getHotel,
    });
}