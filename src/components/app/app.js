import React, {Component} from 'react'
import './app.css'

import {Header} from '../header/header'
import {RandomPlanet} from '../planet/random-planet/random-planet'
import {ErrorIndicator} from '../error-directory/error-indication/error-indicator'
import {ItemDetails} from '../item-component/item-details/item-details'
import {SwapiService} from '../../api/swapi-api'
import {ErrorBoundry} from '../error-directory/error-boundry/error-boundry'
import {Row} from '../item-component/item-row/row-item'
import {Record} from '../item-component/item-record/record'

export class App extends Component {

	swapiService = new SwapiService()

	state = {
		showRandomPlanet: true,
		hasError: false
	}

	toggleRandomPlanet = () => {
		this.setState(state => {
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

		if (this.state.hasError) return <ErrorIndicator/>

		const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null

		const {getPerson, getStarShips, getPersonImage, getStarShipImage} = this.swapiService

		const personDetails = (
			<ItemDetails
				itemId={4}
				getData={getPerson}
				getImageUrl={getPersonImage}>


				<Record field={'gender'} label={'Gender:'}/>
				<Record field={'eyeColor'} label={'Eye Color:'}/>

			</ItemDetails>
		)

		const starShipDetails = (
			<ItemDetails
				itemId={9}
				getData={getStarShips}
				getImageUrl={getStarShipImage}>

			</ItemDetails>
		)

		return (
			<ErrorBoundry>
				<div className="stardb-app">
					<Header/>

					<Row left={personDetails} right={starShipDetails}/>


					{/*{planet}

				<button
					className="toggle-planet btn btn-warning btn-lg"
					onClick={this.toggleRandomPlanet}>
					Toggle Random Planet
				</button>

				<PeoplePage />

				<br/>

				<div className="row mb2">
					<div className="col-md-6">
						<ItemList
							onItemSelected={this.onPersonSelected}
							getData={this.swapiService.getAllPlanets}
							renderItem={item => item.name}/>
					</div>
					<div className="col-md-6">
						<PersonDetails
							personId={this.state.selectedPerson}/>
					</div>
				</div>

				<br/>

				<div className="row mb2">
					<div className="col-md-6">
						<ItemList
							onItemSelected={this.onPersonSelected}
							getData={this.swapiService.getAllStarships}
							renderItem={item => item.name}/>
					</div>
					<div className="col-md-6">
						<PersonDetails
							personId={this.state.selectedPerson}/>
					</div>
				</div>*/}


				</div>
			</ErrorBoundry>
		)
	}
}
