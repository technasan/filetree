import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

// Проверяем, есть ли структура дерева в localstorage
if (localStorage.getItem('oldTree') === 'yes' && localStorage.getItem('mytreedata')) {
	// console.log('-- Old Tree --')
	const root = ReactDOM.createRoot(document.getElementById('root'))
	root.render(
		<React.StrictMode>
			<App appData={localStorage.getItem('mytreedata')} oldTree='yes' appHello='Hello Old FileTree' />
		</React.StrictMode>
	)
} else {
	// если в localstorage пусто, запрашиваем начальные данные
	fetch(`${process.env.PUBLIC_URL}/initial.json`)
		.then(r => r.json())
		.then(data => {
			console.log('-- New Tree --')
			const root = ReactDOM.createRoot(document.getElementById('root'))
			root.render(
				<React.StrictMode>
					<App appData={data} oldTree='no' appHello='Hello New FileTree' />
				</React.StrictMode>
			)
		})
		.catch(error => {
			console.log('[err reading file]', error)
		})
}
