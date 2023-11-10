import React, { useState, useContext } from 'react'
import { FileContext } from './FileContext.js'
import { Tree } from 'antd'

function TreeFiles({ appData }) {
	const [gData, setGData] = useState(appData)
	const [expandedKeys] = useState([]) // const [expandedKeys] = useState(['0-1'])

	const onDragEnter = info => {
		console.log(info)
		// expandedKeys, set it when controlled is needed
		// setExpandedKeys(info.expandedKeys)
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

		console.log('[before setGData]', data)

		setGData(data)
		localStorage.setItem('mytreedata', JSON.stringify(data))
		localStorage.setItem('oldTree', 'yes')
	}

	const { filedata, setFiledata } = useContext(FileContext)
	console.log('[Tree filedata]', gData, filedata)

	// функция заменяет текст выбранного файла при вводе в TextField
	function changeFileText(key, arrayData) {
		const newtree = arrayData.map((item, i) => {
			if (item.children) {
				item.children = changeFileText(key, item.children)
			}
			if (item.key === key) {
				// заменить найденный текст
				item.text = filedata.text
				// console.log('[fd]', filedata.key, key, filedata.text)
				return item
			} else {
				// остальные не меняем, возвращаем как есть
				return item
			}
		})
		return newtree
	}

	if (filedata.key != null) {
		const newtree = changeFileText(filedata.key, gData)
		// console.log('[newtree]', newtree)
	}

	const onSelect = (info, e) => {
		console.log('[node onSelect]', info, e, filedata)
		setFiledata({ key: e.node.key, text: e.node.text })
	}

	return (
		<Tree
			className='draggable-tree'
			defaultExpandedKeys={expandedKeys}
			draggable
			blockNode
			onDragEnter={onDragEnter}
			onDrop={onDrop}
			onSelect={onSelect}
			treeData={gData}
		/>
	)
}
export default TreeFiles
