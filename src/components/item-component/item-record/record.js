import React from 'react'

export const Record = ({ field, label, item}) => {

	//debugger

	return (
		<li className="list-group-item">
			<span className="term">{label}</span>
			<span>{item[field]}</span>
		</li>
	)
}




