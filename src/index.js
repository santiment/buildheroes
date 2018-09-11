import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import getGithubActivity from './getGithubActivity'
import registerServiceWorker from './registerServiceWorker'
import 'normalize.css/normalize.css'
import './index.css'

getGithubActivity().then(activities => {
  ReactDOM.render(<App activities={activities} />, document.getElementById('root'))
})
registerServiceWorker()
