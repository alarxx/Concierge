import React from 'react';
import {useParams} from "react-router-dom";

export default function Book(){
    const {id} = useParams();
    return (<h1>[Book {id}]</h1>);
}