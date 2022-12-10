import React from 'react';

import {MyProvider} from './MyContext';
import Inside from './Inside'

export default function Main(){
    return (
        <MyProvider>
            <h1>Hello Context</h1>
            <Inside />
        </MyProvider>
    );
}