
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

    addCountry = (e) => {
        const countries = this.state.countries;
        countries.push({
            label: 'Country',
            list: countries,
            onChange: function(){}
        })
        this.setState({countries: countries})
    }

    render() {
        const items = this.state.countries.map((item, k) => {
            return (<CountryItem key={k} list={item.list} label={item.label} onChange={item.onChange} />)
        })
        return (
            <div>
                <div>
                    <button onClick={this.addCountry}>Add</button>
                </div>
                {items}
            </div>
        )
    }
}
