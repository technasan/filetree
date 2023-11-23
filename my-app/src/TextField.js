import React, { useContext } from 'react'
import { FileContext } from './FileContext.js'

import './App.css'
import { Input } from 'antd'

const { TextArea } = Input

function TextField() {
	const { filedata, setFiledata } = useContext(FileContext)
	const onHandleInput = e => {
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
