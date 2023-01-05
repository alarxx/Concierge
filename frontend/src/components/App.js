import React, {useEffect, useState} from 'react';

/*import {Link, Routes, Route} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Logout from "./pages/auth/Logout";
import {SocketProvider} from "./hooks/socket-context";
import Chat from "./pages/chat/Chat";
import useFetch from "./hooks/useFetch";
import useAuth from "./hooks/useAuth";*/

import MultistepForm from './multistep_form/MultistepForm';

export default function App(){
	return <MultistepForm/>;
	/*const auth = useAuth();
	const {user, userLoading} = auth;

	return (
		<SocketProvider>
			<h1>[Application]</h1>

			{!userLoading && user?.email && <h2>{user.email}</h2>}
			{!userLoading && !user?.email && <h2>Unauthorized</h2>}
			{userLoading && <h2>Loading...</h2>}

			<nav>
				<li><Link to="/">Home page</Link></li>
				<li><Link to="/login">Sign in</Link></li>
				<li><Link to="/register">Sign up</Link></li>
				<li><Link to="/logout">Log Out</Link></li>
				<li><Link to="/chat">Chat</Link></li>
				<li><Link to="/order">Order</Link></li>
			</nav>

			<Routes>
				<Route path="/" element={<h1>[Home page]</h1>} />

				<Route path="/login" element={<Login auth={auth}/>} />
				<Route path="/register" element={<Register auth={auth}/>} />
				<Route path="/logout" element={<Logout auth={auth}/>} />

				<Route path='/chat' element={<Chat />} />
			</Routes>
		</SocketProvider>
	);*/
}
