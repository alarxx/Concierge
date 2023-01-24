import React, {useEffect, useState} from 'react';

import {Link, Routes, Route} from "react-router-dom";

import Home from "./pages/Home";
import Auth from './pages/auth/Auth'

import Logout from "../arch/authArchive/Logout";
import ChatApp from "./pages/chat/ChatApp";
import Order from './pages/order/Order'
import Profile from './pages/profile/Profile'
import Partners from './pages/partners/Partners'

import {AppContextProvider} from "./context/AppContext";

import './assets/css/style.css'
import './assets/css/adaptive.css'

export default function Router(){
	// return (<TestSocket />)
	return (
		<AppContextProvider>
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path='/auth' element={<Auth />} />
				<Route path="/logout" element={<Logout />} />

				<Route path={'/chat'}>
					<Route index element={<ChatApp />}/>
					<Route path=':id' element={<ChatApp />} />
				</Route>

				<Route path='/order' element={<Order />} />

				<Route path='/profile' element={<Profile />} />

				<Route path='/partners' element={<Partners />} />
			</Routes>
		</AppContextProvider>
	);
}

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/