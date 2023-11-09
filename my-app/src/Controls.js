import React, { useState } from 'react'
import './App.css'
import { Button, Space } from 'antd'

function Controls() {
	return (
		<Space id='btnContainer'>
			<Button type='primary' className='button' disabled>
				Новый файл
			</Button>
			<Button type='primary' className='button' disabled>
				Новая папка
			</Button>
		</Space>
	)
}
export default Controls
