import React, { useContext, useState } from 'react'
import { FileContext } from './FileContext.js'

import './App.css'
import { Input } from 'antd'

const { TextArea } = Input

function TextField() {
	const [textval, setTextVal] = useState('')
	// const [currentkey, setCurrentKey] = useState('')
	const { filedata, setFiledata } = useContext(FileContext)

	const onHandleInput = e => {
		// console.log('[textfield onInput]', e.target.value, filedata)
		setTextVal(e.target.value)
		setFiledata({ key: filedata.key, text: e.target.value })
	}

	return (
		<TextArea
			rows={8}
			placeholder='Сделайте новую заметку'
			className='text-field'
			value={filedata.text}
			onInput={onHandleInput}
		></TextArea>
	)
}
export default TextField
