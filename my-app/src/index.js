import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Проверяем, есть ли структура дерева в localstorage
if (localStorage.getItem('mytreedata')) {
	const root = ReactDOM.createRoot(document.getElementById('root'))
	root.render(
		<React.StrictMode>
			<App appData={localStorage.getItem('mytreedata')} appHello='Hello Old FileTree' />
		</React.StrictMode>
	)
} else {
	// если в localstorage пусто, запрашиваем начальные данные
	fetch(`${process.env.PUBLIC_URL}/initial.json`)
		.then(r => r.json())
		.then(data => {
			const root = ReactDOM.createRoot(document.getElementById('root'))
			root.render(
				<React.StrictMode>
					<App appData={data} appHello='Hello New FileTree' />
				</React.StrictMode>
			)
		})
		.catch(error => {
			console.log('[error reading file]', error)
		})
}
