import React, { useState } from 'react'

import './App.css'
import { Row, Col, Flex, Typography } from 'antd'
// import { getIcon } from './helpers'
import { FileContext } from './FileContext.js' // контекст для хранения текста редактируемого файла
// import {
// 	CloseCircleOutlined,
// 	FileTextOutlined,
// 	FileAddOutlined,
// 	FolderOutlined,
// 	FolderOpenOutlined,
// 	FolderAddOutlined,
// 	RightOutlined,
// 	UpOutlined,
// } from '@ant-design/icons'

import TextField from './TextField'
// import Controls from './Controls'
import TreeFiles from './Tree'

const { Title } = Typography

function App({ appData, oldTree }) {
	// стартовые значения для хранения текста редактируемого файла
	const initfile = {
		key: null,
		text: '',
	}
	// Текст и key открытого в поле редактирования файла
	const [filedata, setFiledata] = useState(initfile)

	// функция добавления ключей для отображения дерева - при первом проходе
	const levelData = (array, _level, _preKey) => {
		const preKey = _preKey || '0'
		const level = _level || '0'
		for (let i = 0; i < array.length; i++) {
			const key = `${preKey}-${i}`
			array[i].key = key
			// array[i].isFolder === false ? (array[i].icon = <FileTextOutlined />) : (array[i].icon = <FolderOutlined />)
			// array[i].title = <FolderOutlined /> + array[i].title
			// console.log('-', array[i].icon, array[i].title)
			if (array[i].children.length > 0) {
				levelData(array[i].children, level + 1, key)
			}
		}
		return array
	}

	// Проверяем, есть ли структура файлов в localstorage. Если да - берем данные оттуда,
	// нет - добавляем keys для дерева и сразу записываем в localstorage.

	const treefiles = localStorage.getItem('mytreedata') == null ? levelData(appData) : JSON.parse(appData)
	console.log('[App.js treefiles]', treefiles)

	if (localStorage.getItem('mytreedata') == null) {
		localStorage.setItem('mytreedata', JSON.stringify(treefiles))
	}

	// Поскольку дерево хранится в localStorage, не использую для него state
	// const [treedata, setTreeData] = useState(treefiles)

	return (
		<div className='App'>
			<Title className='heading'>The File Tree App</Title>
			<div className='block-bg'>
				<Row gutter={8}>
					<FileContext.Provider value={{ filedata, setFiledata }}>
						<Col span={10}>
							<Flex vertical='true' justify='space-between'>
								<div className='h-tree'>
									<TreeFiles appData={treefiles} filedata={filedata} className='text-field' />
								</div>
								<br />
							</Flex>
						</Col>
						<Col span={14} offset={0}>
							<TextField />
						</Col>
					</FileContext.Provider>
				</Row>
			</div>
		</div>
	)
}
export default App

// {getIcon('folder_opened')} {getIcon('arrow_side')} {getIcon('arrow_side')} {getIcon('folder_opened')} {getIcon('file')}
// <Controls />
