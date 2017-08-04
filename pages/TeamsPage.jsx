
require('../assets/index.css')
import React from 'react'

class TeamUsers extends React.Component {
    render() {
        const { data } = this.props
        const rows = data.map(user => (
            <tr>
                <td>{user.username}</td>
                <td>{user.useremail}</td>
                <td>{user.usertype}</td>
            </tr>
        ))
        return (
            <table className="table2">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Type</th>
                </tr>
                {rows}
            </table>
        )
    }
}

class TeamInfo extends React.Component {
    render() {
        const { data } = this.props
        return (
            <table className="table2">
                <tr>
                    <td>Name</td>
                    <td>{data.teamname}</td>
                </tr>
                <tr>
                    <td>Location</td>
                    <td>{data.location}</td>
                </tr>
                <tr>
                    <td>Account Type</td>
                    <td>{data.accounttype}</td>
                </tr>
                <tr>
                    <td>Users</td>
                    <td><TeamUsers data={data.teamuser} /></td>
                </tr>
            </table>
        )
    }
}

export class TeamsPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { teams } = this.props
        const rows = teams.map(team => <TeamInfo data={team}/>)
        return (
            <div>
                {rows}
            </div>
        )
    }
}
