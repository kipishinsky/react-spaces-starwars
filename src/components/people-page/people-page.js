import React, {Component} from 'react'
import './people-page.css'

import {ErrorIndicator} from '../error-indication/error-indicator'
import {ItemList} from '../item-list/item-list'
import {PersonDetails} from '../person-details/person-details'
import {SwapiService} from '../../api/swapi-api'



export class PeoplePage extends Component {

	swapiService = new SwapiService()

	state = {
		selectedPerson: 3,
		hasError: false
	}

	componentDidCatch(error, info) { //error сама ошибка, инфо детали этой ошибки
		this.setState({
			hasError: true
		})
	}

	onPersonSelected = (selectedPerson) => {
		this.setState({selectedPerson})
	}

	renderingItems = ({ name, gender, birthYear }) => {
		return `${name} ( ${gender}, ${birthYear} ) `
	}



	render() {

		if (this.state.hasError) {
			return <ErrorIndicator/>
		}

		const itemList = <ItemList
				onItemSelected={this.onPersonSelected}
				getData={this.swapiService.getAllPeople}
				renderItem={this.renderingItems}/>

		const personList = <PersonDetails personId={this.state.selectedPerson}/>

		return (
			<Row left={itemList} right={personList} />
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