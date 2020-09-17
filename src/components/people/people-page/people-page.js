import React, {Component} from 'react'
import './people-page.css'

import {ItemDetails} from '../../item-component/item-details/item-details'
import {Row} from '../../item-component/item-row/row-item'
import {SwapiService} from '../../../api/swapi-api'
import {ItemList} from '../../item-component/item-list/item-list'
import {ErrorBoundry} from '../../error-directory/error-boundry/error-boundry'


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
		const personList = <ErrorBoundry>
			<ItemDetails personId={this.state.selectedPerson}/>
		</ErrorBoundry>

		return (
			<ErrorBoundry>
				<Row left={itemList} right={personList}/>
			</ErrorBoundry>
		)
	}
}

