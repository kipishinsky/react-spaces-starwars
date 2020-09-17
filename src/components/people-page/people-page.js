import React, {Component} from 'react'
import './people-page.css'

import {ErrorIndicator} from '../error-indication/error-indicator'
import {ItemList} from '../item-list/item-list'
import {PersonDetails} from '../person-details/person-details'
import {SwapiService} from '../../api/swapi-api'



class ErrorBoundy extends Component {

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



export class PeoplePage extends Component {

	swapiService = new SwapiService()

	state = {
		selectedPerson: 3
	}


	onPersonSelected = (selectedPerson) => {
		this.setState({selectedPerson})
	}

	renderingItems = ({name, gender, birthYear}) => {
		return `${name} ( ${gender}, ${birthYear} ) `
	}


	render() {

		const itemList = <ItemList
			onItemSelected={this.onPersonSelected}
			getData={this.swapiService.getAllPeople}
			renderItem={this.renderingItems}/>


			// передача свойств через тело компоненты, а не через параметры
		const personList = <ErrorBoundy>
			<PersonDetails personId={this.state.selectedPerson}/>
		</ErrorBoundy>

		return (
			<ErrorBoundy>
				<Row left={itemList} right={personList}/>
			</ErrorBoundy>
		)
	}
}

const Row = ({left, right}) => {

	return (
		<div className="row mb2">
			<div className="col-md-6">
				{left}
			</div>
			<div className="col-md-6">
				{right}
			</div>
		</div>
	)
}