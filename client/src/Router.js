import React, {useEffect, useState} from 'react';

import {Link, Routes, Route, Navigate, useSearchParams, useNavigate, useLocation} from "react-router-dom";

import Landing from "./pages/landing/Landing";
import Layout from "./components/layouts/Layout";
import Main from "./pages/Main"
import Profile from "./pages/Profile"
import Awards from "./pages/Awards"
import Voiting from "./pages/Voiting"
import Authentication from "./pages/auth/main/Authentication";
import Logout from "./pages/auth/logout/Logout";

import {AppContextProvider, useAppContext} from './context/AppContext'
import CheckAuthenticated from "./middlewares/CheckAuthenticated";
import CheckNotAuthenticated from "./middlewares/CheckNotAuthenticated";
import Banned from "./pages/auth/status/Banned";
import Activation from "./pages/auth/activation/Activation";
import Test from "./pages/auth/test/Test";
import NoName from "./pages/auth/status/NoName";
import SendResetPasswordMail from "./pages/auth/password/SendResetPasswordMail";
import ResetPassword from "./pages/auth/password/ResetPassword";

export default function Router(){

	return (
		<AppContextProvider>
			<Routes>

				<Route path="/" element={
					// <CheckAuthenticated page={
					<Landing />
					// }/>
				}/>


				<Route path="/test" element={
					// <CheckAuthenticated page={
					<Test />
					// }/>
				}/>


				<Route path='/authn'>
					<Route index element={<Authentication />}/>

					<Route path='send-reset' element={<SendResetPasswordMail />} />

					<Route path='reset' element={<ResetPassword />} />

					<Route path='activation' element={<Activation />}/>

					<Route path='logout' element={
						<CheckAuthenticated page={
							<Logout />
						} />
					}/>

					<Route path='banned' element={
						<CheckAuthenticated page={
							<Banned />
						}/>
					}/>

					<Route path='no_name' element={
						<CheckAuthenticated page={
							<NoName />
						} />
					}/>
				</Route>


				<Route path='/protected' element={
					<CheckAuthenticated page={
						<h1>[Protected page]</h1>
					}/>
				} />


				<Route path='/offline' element={
					<h1>[Offline page]</h1>
				} />


				<Route path='/main' element={
					<CheckAuthenticated page={<Main />} />
				}/>


				<Route path='/voiting' element={<Voiting />} />
				<Route path='/awards' element={<Awards />} />
				<Route path='/profile' element={<Profile />} />

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