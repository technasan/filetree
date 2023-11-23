import React, { useState } from 'react'

import './App.css'
import { Row, Col, Flex, Typography } from 'antd'
// import { getIcon } from './helpers'
import { FileContext } from './FileContext.js' // контекст для хранения текста редактируемого файла
import {
	CloseCircleOutlined,
	FileTextOutlined,
	FileAddOutlined,
	FolderOutlined,
	FolderOpenOutlined,
	FolderAddOutlined,
	RightOutlined,
	UpOutlined,
} from '@ant-design/icons'

import TextField from './TextField'
import Controls from './Controls'
import TreeFiles from './Tree'

const { Title } = Typography

function App({ appData, oldTree }) {
	// стартовые значения для хранения текста редактируемого файла
	const initfile = {
		key: null,
		text: '',
	}
	const [filedata, setFiledata] = useState(initfile)

	// функция добавления ключей для отображения дерева - при первом проходе
	const levelData = (array, _level, _preKey) => {
		const preKey = _preKey || '0'
		const level = _level || '0'
		for (let i = 0; i < array.length; i++) {
			const key = `${preKey}-${i}`
			array[i].key = key
			// icon: <CarryOutOutlined />
			array[i].isFolder === false ? (array[i].icon = <FileTextOutlined />) : (array[i].icon = <FolderOutlined />)
			// array[i].title = <FolderOutlined /> + array[i].title
			// console.log('-', array[i].icon, array[i].title)
			if (array[i].children.length > 0) {
				levelData(array[i].children, level + 1, key)
			}
		}
		return array
	}

	// Проверяем признак, есть ли структура файлов в localstorage. Если да - берем данные из storage,
	// нет - добавляем keys для дерева и сразу записываем в localstorage.
	const treefiles = oldTree === 'no' ? levelData(appData) : JSON.parse(appData)
	if (oldTree === 'no') {
		// const treefilesToLocal = treefiles.map(el => ({ ...el, icon: el.icon.type.render.displayName })) //icon.type.render.displayName} })
		// console.log('tf', treefilesToLocal)
		localStorage.setItem('mytreedata', JSON.stringify(treefiles))
		localStorage.setItem('oldTree', 'yes')
	}

	const [treedata, setTreeData] = useState(treefiles)

	return (
		<div className='App'>
			<Row gutter={16}>
				<Col span={14} offset={4}>
					<Title className='heading'>The File Tree App</Title>
				</Col>
			</Row>
			<Row gutter={16} className='m-top-5'>
				<FileContext.Provider value={{ filedata, setFiledata }}>
					<Col span={6} offset={4} className='block-bg'>
						<Flex vertical='true' justify='space-between'>
							<div className='h-tree'>
								<TreeFiles appData={treedata} filedata={filedata} className='text-field' />
							</div>
							<br />
							<Controls />
						</Flex>
					</Col>
					<Col span={8} offset={0} className='block-bg'>
						<TextField />
					</Col>
				</FileContext.Provider>
			</Row>
		</div>
	)
}
export default App

// {getIcon('folder_opened')} {getIcon('arrow_side')} {getIcon('arrow_side')} {getIcon('folder_opened')} {getIcon('file')}
