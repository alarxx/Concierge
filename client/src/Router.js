import React, {useEffect, useState} from 'react';

import {Link, Routes, Route, Navigate, useSearchParams, useNavigate, useLocation} from "react-router-dom";

import Page from "./middlewares/Page";
import Protected from './pages/protected/Protected';

import Landing from "./pages/landing/Landing";
import Layout from "./components/layouts/Layout";
import Main from "./pages/Main"
import Profile from "./pages/Profile"
import Awards from "./pages/Awards"
import Voting from "./pages/Voting"
import Authentication from "./pages/auth/main/Authentication";
import Logout from "./pages/auth/logout/Logout";

import {AppContextProvider, useAppContext} from './context/AppContext'
import ProtectedPage from "./middlewares/ProtectedPage";
import Banned from "./pages/auth/status/Banned";
import Activation from "./pages/auth/activation/Activation";
import Test from "./pages/auth/test/Test";
import NoName from "./pages/auth/status/NoName";
import SendResetPasswordMail from "./pages/auth/password/SendResetPasswordMail";
import ResetPassword from "./pages/auth/password/ResetPassword";
import ServiceOrder from "./pages/service_order/ServiceOrder";

export default function Router(){

	return (
		<AppContextProvider>
			<Routes>

				<Route path="/" element={
					// Можно оставить для проверки Middleware
					<Page>
						<Landing />
					</Page>
				}/>


				<Route path='/authn'>
					<Route index element={
						<Page>
							<Authentication />
						</Page>
					}/>

					<Route path='logout' element={
						<ProtectedPage>
							<Logout />
						</ProtectedPage>
					}/>

					<Route path='banned' element={
						<ProtectedPage>
							<Banned />
						</ProtectedPage>
					}/>

					<Route path='no_name' element={
						<ProtectedPage>
							<NoName />
						</ProtectedPage>
					}/>

					<Route path='send-reset' element={<Page><SendResetPasswordMail /></Page>} />
					<Route path='reset' element={<Page><ResetPassword /></Page>} />
					<Route path='activation' element={<Page><Activation /></Page>}/>

				</Route>


				<Route path='/protected' element={
					<ProtectedPage>
						<Protected />
					</ProtectedPage>
				}></Route>


				<Route path='/offline' element={
					<h1>[Offline page]</h1>
				} />

				<Route path={'/test'} element={
					<Test />
				}/>


				<Route path='/main' element={
					<ProtectedPage>
						<Main />
					</ProtectedPage>
				}/>

				<Route path={'/service-order'} element={
					<Page>
						<ServiceOrder />
					</Page>
				}/>

				{/*<Route path='/voting' element={<Voting />} />
				<Route path='/awards' element={<Awards />} />
				<Route path='/profile' element={<Profile />} />*/}

				<Route path={'*'} element={
					// Нужна чтобы несуществующие страницы не отличались от существующих защищенных
					// Хотя какая разница, наверное, здесь можно указывать 404 Not Found
					<Page><h1>[404 Not Found]</h1></Page>
				}/>
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