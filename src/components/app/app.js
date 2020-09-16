import React, {Component} from 'react'
import './app.css'

import {Header} from '../header/header'
import {RandomPlanet} from '../random-planet/random-planet'
import {ErrorIndicator} from '../error-indication/error-indicator'
import {PeoplePage} from '../people-page/people-page'
import {ItemList} from '../item-list/item-list'
import {PersonDetails} from '../person-details/person-details'
import {SwapiService} from '../../api/swapi-api'

export class App extends Component {

	swapiService = new SwapiService()

	state = {
		showRandomPlanet: true,
		hasError: false
	}

	toggleRandomPlanet = () => {
		this.setState((state) => {
			return {
				showRandomPlanet: !state.showRandomPlanet
			}
		})
	}

	componentDidCatch() {
		console.log('componentDidCatch()')
		this.setState({hasError: true})
	}

	render() {

		if ( this.state.hasError) {
			return <ErrorIndicator />
		}

		const planet = this.state.showRandomPlanet ?
			<RandomPlanet/> :
			null

		return (
			<div className="stardb-app">
				<Header/>
				{planet}

				<button
					className="toggle-planet btn btn-warning btn-lg"
					onClick={this.toggleRandomPlanet}>
					Toggle Random Planet
				</button>

				<PeoplePage />

				<div className="row mb2">
					<div className="col-md-6">
						<ItemList
							onItemSelected={this.onPersonSelected}
							getData={this.swapiService.getAllPeople}/>
					</div>
					<div className="col-md-6">
						<PersonDetails
							personId={this.state.selectedPerson}/>
					</div>
				</div>
			</div>
		)
	}
}
