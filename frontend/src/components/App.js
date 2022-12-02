import React, {useEffect} from 'react';

function App(props){
	useEffect(()=>{
		(async ()=>{
			const response = await fetch('/api');
			const data = await response.json();
			console.log(data);
		})();
	})
	return <h1>Concierge Service</h1>;
}

export default App;