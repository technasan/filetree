import React, { useState, useContext } from 'react'
import { FileContext } from './FileContext.js'
import { Tree } from 'antd'
import { nanoid } from 'nanoid'
import { EditOutlined, PlusOutlined, MinusOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons'

const { TreeNode } = Tree
const expandedKeyArr = ['0']
function TreeFiles({ appData }) {
	const [gData, setGData] = useState(appData)
	const [expandedKeys, setExpandedKeys] = useState(expandedKeyArr) // const [expandedKeys] = useState(['0-1'])

	// Редактирование файла
	const { filedata, setFiledata } = useContext(FileContext)

	// Заменить текст выбранного файла при вводе в TextField
	function changeFileText(key, arrayData) {
		const newtree = arrayData.map((item, i) => {
			if (item.children) {
				item.children = changeFileText(key, item.children)
			}
			if (item.key === key) {
				// заменить найденный текст
				item.title = item.puretitle // фикс ошибки TypeError в title
				item.text = filedata.text
				return item
			} else {
				item.title = item.puretitle // фикс ошибки TypeError в title
				// остальные не меняем, возвращаем как есть
				return item
			}
		})
		return newtree
	}

	if (filedata.key != null) {
		const newtree = changeFileText(filedata.key, gData)
		// console.log('[newtree]', newtree)
		localStorage.setItem('mytreedata', JSON.stringify(newtree))
	}

	const onSelect = (i, e) => {
		setFiledata({ key: e.node.key, text: e.node.text })
	}

	// Фикс ошибки TypeError в title при конвертации в JSON.
	// В localStorage нельзя хранить компоненты иконок, поэтому перед записью надо очистить title.
	// Изначальное название 'файла' хранится в pretitle
	function clearIconsType(arrayData) {
		const newtree = arrayData.map((item, i) => {
			if (item.children) {
				item.children = clearIconsType(item.children)
			}
			item.title = item.puretitle
			return item
		})
		return newtree
	}

	// Функции для перетаскивания
	const onDragEnter = info => {
		setExpandedKeys(info.expandedKeys)
	}
	const onDrop = info => {
		console.log('[info onDrop]', info)
		const dropKey = info.node.key
		const dragKey = info.dragNode.key
		const dropPos = info.node.pos.split('-')
		const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
		const loop = (data, key, callback) => {
			for (let i = 0; i < data.length; i++) {
				if (data[i].key === key) {
					return callback(data[i], i, data)
				}
				if (data[i].children) {
					loop(data[i].children, key, callback)
				}
			}
		}
		const data = [...gData]

		// Find dragObject
		let dragObj
		loop(data, dragKey, (item, index, arr) => {
			arr.splice(index, 1)
			dragObj = item
		})
		if (!info.dropToGap) {
			// Drop on the content
			loop(data, dropKey, item => {
				item.children = item.children || []
				// where to insert. New item was inserted to the start of the array in this example, but can be anywhere
				item.children.unshift(dragObj)
			})
		} else if (
			(info.node.props.children || []).length > 0 &&
			// Has children
			info.node.props.expanded &&
			// Is expanded
			dropPosition === 1 // On the bottom gap
		) {
			loop(data, dropKey, item => {
				item.children = item.children || []
				// where to insert. New item was inserted to the start of the array in this example, but can be anywhere
				item.children.unshift(dragObj)
				// in previous version, we use item.children.push(dragObj) to insert the
				// item to the tail of the children
			})
		} else {
			let ar = []
			let i
			loop(data, dropKey, (_item, index, arr) => {
				ar = arr
				i = index
			})
			if (dropPosition === -1) {
				ar.splice(i, 0, dragObj)
			} else {
				ar.splice(i + 1, 0, dragObj)
			}
		}
		setGData(data)

		const cleareddata = clearIconsType(data)
		localStorage.setItem('mytreedata', JSON.stringify(cleareddata))

		setFiledata({ key: null, text: '' }) // очистить поле редактирования TextField
	}

	// Модификация для удаления-добавления нод
	const onExpand = expandedKeys => {
		setExpandedKeys(expandedKeys)
	}

	const renderTreeNodes = data => {
		let nodeArr = data.map(item => {
			if (item.isEditable) {
				item.title = (
					<div>
						<input value={item.value || ''} onChange={e => onChange(e, item.key)} />

						<CloseOutlined style={{ marginLeft: 10 }} onClick={() => onClose(item.key, item.defaultValue)} />

						<CheckOutlined style={{ marginLeft: 10 }} onClick={() => onSave(item.key)} />
					</div>
				)
			} else {
				item.title = (
					<div>
						<span>{item.puretitle}</span>
						<span>
							<EditOutlined style={{ marginLeft: 10 }} onClick={() => onEdit(item.key)} />

							<PlusOutlined style={{ marginLeft: 10 }} onClick={() => onAdd(item.key)} />
							{item.parentKey === '0' ? null : (
								<MinusOutlined style={{ marginLeft: 10 }} onClick={() => onDelete(item.key)} />
							)}
						</span>
					</div>
				)
			}
			if (item.children) {
				return (
					<TreeNode
						title={item.title}
						key={item.key}
						text={item.text}
						puretitle={item.puretitle}
						isFolder={item.isFolder}
						defaultValue={item.defaultValue}
						dataRef={item}
					>
						{renderTreeNodes(item.children)}
					</TreeNode>
				)
			}
			return (
				<TreeNode
					title={item.title}
					key={item.key}
					text={item.text}
					puretitle={item.puretitle}
					isFolder={item.isFolder}
					defaultValue={item.defaultValue}
				/>
			)
		})
		return nodeArr
	}

	const onEdit = key => {
		editNode(key, gData)
		setGData(gData.slice())
	}

	const editNode = (key, data) =>
		data.forEach(item => {
			if (item.key === key) {
				item.isEditable = true
			} else {
				item.isEditable = false
			}
			item.title = item.defaultValue
			if (item.children) {
				editNode(key, item.children)
			}
		})

	const onAdd = key => {
		if (expandedKeys.indexOf(key) === -1) {
			expandedKeyArr.push(key)
		}
		setExpandedKeys(expandedKeyArr.slice())
		addNode(key, gData)
		setGData(gData.slice())
	}

	const addNode = (key, data) =>
		data.forEach(item => {
			if (item.key === key) {
				if (item.children) {
					item.children.push({
						puretitle: 'default',
						title: 'default',
						text: '',
						isFolder: false,
						key: nanoid(), // этот ключ должен быть единственным
					})
				} else {
					item.children = []
					item.children.push({
						puretitle: 'default',
						title: 'default',
						text: '',
						isFolder: false,
						key: nanoid(),
					})
				}
				return
			}
			if (item.children) {
				addNode(key, item.children)
			}
		})

	const onChange = (e, key) => {
		changeNode(key, e.target.value, gData)
		setGData(gData.slice())
	}

	const changeNode = (key, value, data) =>
		data.forEach(item => {
			if (item.key === key) {
				item.value = value
				item.puretitle = value
			}
			if (item.children) {
				changeNode(key, value, item.children)
			}
		})

	const onSave = key => {
		saveNode(key, gData)
		setGData(gData.slice())
	}

	const saveNode = (key, data) =>
		data.forEach(item => {
			if (item.key === key) {
				item.defaultValue = item.puretitle
			}
			if (item.children) {
				saveNode(key, item.children)
			}
			item.isEditable = false
		})

	const onClose = (key, defaultValue) => {
		setFiledata({ key: null, text: '' }) // очистить поле редактирования TextField
		closeNode(key, defaultValue, gData)
		setGData(gData)
	}

	const closeNode = (key, defaultValue, data) =>
		data.forEach(item => {
			item.isEditable = false
			if (item.key === key) {
				item.puretitle = defaultValue
			}
			if (item.children) {
				closeNode(key, defaultValue, item.children)
			}
		})

	const onDelete = key => {
		setFiledata({ key: null, text: '' }) // очистить поле редактирования TextField
		deleteNode(key, gData)

		setGData(gData.slice())
	}

	const deleteNode = (key, data) =>
		data.forEach((item, index) => {
			if (item.key === key) {
				data.splice(index, 1)
				return
			} else {
				if (item.children) {
					deleteNode(key, item.children)
				}
			}
		})

	return (
		<Tree
			className='draggable-tree'
			defaultExpandedKeys={expandedKeys}
			draggable
			showIcon
			blockNode
			onDragEnter={onDragEnter}
			onDrop={onDrop}
			onSelect={onSelect}
			expandedKeys={expandedKeys}
			onExpand={onExpand}
		>
			{renderTreeNodes(gData)}
		</Tree>
	)
}
export default TreeFiles
