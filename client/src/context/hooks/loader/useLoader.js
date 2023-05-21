import React from 'react';

import useHotel from './hotel/useHotel';

export default function useLoader({ socketHandler }){
    const { getHotel } = useHotel({ socketHandler });
    return ({
        getHotel
    });
}