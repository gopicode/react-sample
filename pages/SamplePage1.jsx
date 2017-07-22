require('../assets/index.css')

import React from 'react'
import { SelectBox } from '../components/SelectBox.jsx'
import countries from '../lib/countries'

class CountryItem extends React.Component {
	render() {
		return (
			<div>
				<label>{this.props.label}</label>
				<SelectBox list={this.props.list} value={this.props.value} onChange={this.props.onChange} />
			</div>
		)
	}
}

export class SamplePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			countries: [],
			email: '',
		}
	}

	addCountry() {
		countries = this.state.countries;
		countries.push({
			label: 'Country',
			list: countries,
			onChange: function(){}
		})
	}

	render() {
		const items = this.state.countries.map(item => {
			return (<CountryItem list={item.list} label={item.label} onChange={item.onChange} />)
		})
		return (
			<div>
				<div>
					<button onClick={this.addCountry}>Add</label>
				</div>
				{items}
			</div>
		)
	}
}
