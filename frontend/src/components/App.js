import React, {useEffect, useState} from 'react';
import Login from "./pages/auth/Login";
import CreatePost from "./pages/post/CreatePost";

import '../styles/App.css';

function App(props){
	const [a, setA] = useState(12);

	useEffect(()=>{
		(async ()=>{
			const {data} = await fetch('/api').then(res => res.json());
			setA(data);
		})();
	});

	return (
		<>
			<CreatePost alar={a}/>
		</>
	);
}

export default App;