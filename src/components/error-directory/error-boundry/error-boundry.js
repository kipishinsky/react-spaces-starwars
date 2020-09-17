import React, {Component} from 'react'
import {ErrorIndicator} from '../error-indication/error-indicator'

export class ErrorBoundry extends Component {

	state = {
		hasError: false
	}

	componentDidCatch() { //error сама ошибка, инфо детали этой ошибки
		this.setState({
			hasError: true
		})
	}

	render() {
		if (this.state.hasError) {
			return <ErrorIndicator/>
		}
		return this.props.children //children один и способов передачи свойств
	}
}