require('../assets/index.css')

import React from 'react'
import { SelectBox } from '../components/SelectBox.jsx'
import countries from '../lib/countries'

export class SamplePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			country1: null,
			country2: null,
			email: '',
		}
	}

	render() {
		return (
			<form>
				<div>
					<label>Email</label>
					<input type="email" value={this.state.email} onChange={e => this.setState({email: e.target.value})} />
				</div>
				<div>
					<label>Country 1</label>
					<SelectBox list={countries} value={this.state.country1} onChange={item => this.setState({country1: item})} />
				</div>
				<div>
					<label>Country 2</label>
					<SelectBox list={countries} value={this.state.country2} onChange={item => this.setState({country2: item})} />
				</div>
			</form>
		)
	}
}
