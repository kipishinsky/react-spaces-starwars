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

	render() {

		if (this.state.hasError) {
			return <ErrorIndicator/>
		}

		return (
			<div className="row mb2">
				<div className="col-md-6">
					<ItemList
						onItemSelected={this.onPersonSelected}
						getData={this.swapiService.getAllPeople}/>
				</div>
				<div className="col-md-6">
					<PersonDetails personId={this.state.selectedPerson}/>
				</div>
			</div>
		)
	}
}
