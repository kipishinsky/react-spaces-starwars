import React from 'react'

export const Record = ({field, label}) => {
	return (
		<li className="list-group-item">
			<span className="term">{field}</span>
			<span>{label}</span>
		</li>
	)
}