import React, {useEffect, useState} from 'react';

import {Link, Routes, Route, Navigate, useSearchParams, useNavigate, useLocation} from "react-router-dom";

import Page from "./middlewares/Page";

import Landing from "./pages/Landing"
import Authentication from "./pages/auth/main/Authentication";
import Logout from "./pages/auth/logout/Logout";

import {AppContextProvider, useAppContext} from './context/AppContext'
import ProtectedPage from "./middlewares/ProtectedPage";
import Banned from "./features/auth/status/Banned";
import Activation from "./pages/auth/activation/Activation";
import NoName from "./features/auth/status/NoName";
import SendResetPasswordMail from "./pages/auth/password/SendResetPasswordMail";
import ResetPassword from "./pages/auth/password/ResetPassword";
import ServiceOrder from "./pages/service_order/ServiceOrder";
import New from './pages/no-admin/New';
import Orders from './pages/no-admin/Orders';
import Chat from './pages/no-admin/Chat';
import Profile from './pages/no-admin/Profile';

export default function Router(){

	return (
		<AppContextProvider>
			<Routes>

				<Route path="/" element={
					//почему при жестком переходе через url на "/" выбрасывает {"message":"Unauthorized","errors":[]} (до этого выбрасывал чето с proxy, пока сервер на запустил) с редиректом обратно. приходится стопить клинт и npm start прописывать
					// Можно оставить для проверки Middleware
					// Причина в webpack-dev-server, который работает только с '/' маршрутом
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


				<Route path='/offline' element={
					<h1>[Offline page]</h1>
				} />


				<Route path='/main' element={
					<ProtectedPage>
						{/* <Main /> */}
					</ProtectedPage>
				}/>

				<Route path={'/service-order'} element={
					<Page>
						<ServiceOrder />
					</Page>
				}/>

				
				<Route path='/new' element={
					<ProtectedPage> <New /></ProtectedPage>
				
				}/>
				<Route path='/orders' element={<ProtectedPage><Orders /></ProtectedPage>}/>
				<Route path='/chat' element={<ProtectedPage><Chat /></ProtectedPage>}/>
				<Route path='/profile' element={<ProtectedPage><Profile /></ProtectedPage>}/>

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