import React from 'react'
import './App.css'

const GithubActivityList = ({activities = []}) => (
  <table>
    <tbody>
    <tr>
      <th>name</th>
      <th>30 days dev activity</th>
    </tr>
    {activities.map(activity => (
      <tr key={activity.id}>
        <td>
          <a href={activity.githubLink}>{activity.slug}</a> 
        </td>
        <td>
          {activity.activity} 
        </td>
      </tr>
    ))}
    </tbody>
  </table>
)

const App = ({activities = []}) => (
  <div className='container'>
    <header>
      <h1>Top 10 crypto projects <br /> by development activity</h1>
    </header>
    <GithubActivityList activities={activities}/>
    <footer>
      <p>-------</p>
      <h3>What 'development activity' is?</h3>
      <p>Metric based on number of Github 'events' including issue interactions,
        pull requests, comments, and wiki edits, plus the number of public
        repositories a project is maintaining</p>
      <p>Read <a href="https://medium.com/santiment/tracking-github-activity-of-crypto-projects-introducing-a-better-approach-9fb1af3f1c32">
          more about how it works?
        </a>
      </p>
      <small>Made by <a href='https://santiment.net'>Santiment API</a></small>
    </footer>
  </div>
)

export default App
