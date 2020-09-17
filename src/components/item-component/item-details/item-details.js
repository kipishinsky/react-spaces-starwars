import React, {Component} from 'react'
import './item-details.css'

import {Spinner} from '../../load-component/spinner/spinner'
import {ErrorButton} from '../../error-directory/error-button/error-button'

export class ItemDetails extends Component {

	state = {
		item: null,
		image: null
	}

	componentDidMount() {
		this.updateItem()
	}

	componentDidUpdate(prevProps) {
		// чтобы не зацикливалось, принимает prevProps, prevState
		if (this.props.itemId !== prevProps.itemId) {
			this.updateItem()
		}
	}

	updateItem = () => {
		const {itemId, getData, getImageUrl} = this.props
		if (!itemId) {
			return
		}
		getData(itemId).then((item) => {
			this.setState({
				item,
				image: getImageUrl(item)
			})
		})
	}

	render() {

		const {item, image} = this.state

		if (!this.state.item) {
			return <Spinner/>
		}

		const {id, name, gender, birthYear, eyeColor} = item

		//debugger

		return (
			<div className="person-details card">
				<img className="person-image"
				     src={image}/>

				<div className="card-body">
					<h4>{name}</h4>
					<ul className="list-group list-group-flush">
						{
							React.Children.map(this.props.children, (child) => {
								return React.cloneElement(child, {item})
							})
						}
					</ul>
					<ErrorButton/>
				</div>
			</div>
		)
	}
}
