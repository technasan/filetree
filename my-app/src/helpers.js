import React from 'react'
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

export const getIcon = type => {
	switch (type) {
		case 'folder':
			return <FolderOutlined />
		case 'folder_opened':
			return <FolderOpenOutlined />
		case 'addfolder':
			return <FolderAddOutlined />
		case 'addfile':
			return <FileAddOutlined />
		case 'file':
			return <FileTextOutlined />
		case 'delete':
			return <CloseCircleOutlined style={{ fontSize: '16px', color: '#d25' }} />
		case 'arrow_side':
			return <RightOutlined />
		case 'arrow_up':
			return <UpOutlined />
		default:
			return null
	}
}
