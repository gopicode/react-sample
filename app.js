import React from 'react'
import { render } from 'react-dom'
import {TeamsPage  } from './pages/TeamsPage.jsx'
import teamDetails from './lib/teamDetails'

render(<TeamsPage teams={teamDetails.team} />, document.getElementById('root'))
