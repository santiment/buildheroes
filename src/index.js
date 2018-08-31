import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import getGithubActivity from './getGithubActivity'
import registerServiceWorker from './registerServiceWorker'

getGithubActivity().then(activities => {
  ReactDOM.render(<App activities={activities} />, document.getElementById('root'))
})
registerServiceWorker()
