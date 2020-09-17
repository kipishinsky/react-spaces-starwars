import React, {Component} from 'react'
import './people-page.css'

import {PersonDetails} from '../person-details/person-details'
import {Row} from '../../item-component/row-item/row-item'
import {SwapiService} from '../../../api/swapi-api'
import {ItemList} from '../../item-component/item-list/item-list'
import {ErrorBoundy} from '../../error-directory/error-boundy/error-boundy'


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

