import React from 'react'
import LineChart from 'react-svg-line-chart'
import { getGATimeseries } from './getGithubActivity'
import SubscribtionForm from './SubscribtionForm'
import 'normalize.css/normalize.css'
import './App.css'

class GATimeseries extends React.Component {
  state = {
    timeseries: []
  }

  componentDidMount() {
    getGATimeseries({slug: this.props.slug}).then(({data}) => {
      this.setState({ timeseries: data.githubActivity })
    })
  }

  render() {
    const { children, render } = this.props
    const timeseries = this.state.timeseries.map((el, index) => ({x:index, y: el.activity})) || []
    if (typeof children === 'function') return (<div>{children(timeseries)}</div>)
    return render(timeseries)
  }
}

const GithubActivityList = ({activities = []}) => (
  <table>
    <thead>
      <tr>
       <td>Last 30 days activity</td>
      </tr>
    </thead>
    <tbody>
    {activities.map((activity, index) => (
      <tr key={activity.id}>
        <td>
          {index + 1}. <a href={activity.githubLink}>{activity.slug}</a> 
        </td>
        <td>
          <div className='rotate'>
            <label>{activity.activity}</label>
          </div>
        </td>
        <td className='chart'>
          <GATimeseries slug={activity.slug}>
            {timeseries => (
              <LineChart 
                data={timeseries}
                pointsRadius={0} 
                pathWidth={8}
                gridVisible={false}
                axisVisible={false}
                labelsVisible={false}
              />
            )}
          </GATimeseries>
        </td>
      </tr>
    ))}
    </tbody>
  </table>
)

const App = ({activities = []}) => (
  <div className='container'>
    <header className='title'>
      <h2>Top 12 crypto projects by 30 days github activity</h2>
    </header>
    <section>
      <div className='github-activity-explanation'>
        <div className='rotate'>
          <h2><span>Top 12 crypto</span></h2>
          <h2><span>projects</span></h2>
          <h2><span>by github</span></h2>
          <h2><span>activity</span></h2>
        </div>
        <p>
          <strong>Github</strong> activity is the number of <strong>Github</strong> 'events' including issue interactions,
          pull requests, comments, and wiki edits, plus the number of public
          repositories a project is maintaining.</p>
        <p>
          Read <a href="https://medium.com/santiment/tracking-github-activity-of-crypto-projects-introducing-a-better-approach-9fb1af3f1c32">
            more about how it works?
          </a>
        </p>
        <SubscribtionForm />
      </div>
      <GithubActivityList activities={activities}/>
    </section>
    <footer>
      <small style={{
        float: 'right',
        marginBottom: 22
      }}>
        <span>Powered by <a href='https://santiment.net'>Santiment API</a></span>
        <span>Made with ❤️ by Yura, Nemo, Kelvin, Kim</span>
      </small>
    </footer>
  </div>
)

export default App
