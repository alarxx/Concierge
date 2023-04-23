import React from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter} from "react-router-dom";

import Router from "./Router.js"

import styles from './assets/css/new.css'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<BrowserRouter><Router/></BrowserRouter>);

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/