import React, {useEffect, useState} from 'react';

import {Link, Routes, Route} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Logout from "./pages/auth/Logout";
import ChatApp from "./pages/chat/ChatApp";
import Order from './pages/order/Order'
import Profile from './pages/profile/Profile'

import {AppContextProvider} from "./context/AppContext";

import '../css/style.css'
import '../css/adaptive.css'

export default function AppRouter(){
	return (
		<AppContextProvider>
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/logout" element={<Logout />} />

				<Route path='/chat' element={<ChatApp />} />

				<Route path='/order' element={<Order />} />

				<Route path='/profile' element={<Profile />} />
			</Routes>
		</AppContextProvider>
	);
}
