import React from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter} from "react-router-dom";

import {AppContextProvider} from "./context/AppContext";
import Main from "./Main";

import './assets/css/global.css';


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<BrowserRouter><AppContextProvider><Main /></AppContextProvider></BrowserRouter>);

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/