import React, {useEffect, useState} from 'react';

import {Link, Routes, Route} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Auth from './pages/auth/Auth'

import Logout from "./pages/auth/Logout";
import ChatApp from "./pages/chat/ChatApp";
import Order from './pages/order/Order'
import Profile from './pages/profile/Profile'
import Partners from './pages/partners/Partners'

import RegisterSimple from "./pages/auth/RegisterSimple";
import Chat from "./pages/Chat";


import {AppContextProvider} from "./context/AppContext";

import './assets/css/style.css'
import './assets/css/adaptive.css'

export default function Router(){
	// return (<TestSocket />)
	return (
		<AppContextProvider>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/test" element={<Chat />} />

				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/register/simple" element={<RegisterSimple />} />
				<Route path="/logout" element={<Logout />} />
				<Route path={'/chat'}>
					<Route index element={<ChatApp />}/>
					<Route path=':id' element={<ChatApp />} />
				</Route>

				<Route path='/order' element={<Order />} />

				<Route path='/profile' element={<Profile />} />

				<Route path='/partners' element={<Partners />} />
				<Route path='/auth' element={<Auth />} />
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