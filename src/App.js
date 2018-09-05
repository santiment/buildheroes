import React from 'react'
import { getGATimeseries } from './getGithubActivity'
import LineChart from 'react-svg-line-chart'
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

const MonthControl = () => (
  <div className='month-control'>
    <strong>2018</strong>
    <div className='month active'>September</div>
    <div className='month'>August</div>
    <div className='month'>July</div>
    <div className='month'>June</div>
  </div>
)

const App = ({activities = []}) => (
  <div className='container'>
    <header className='title'>
      <h2>Top 12 crypto projects by 30 days github activity</h2>
    </header>
    {
      //<MonthControl />
    }
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
      </div>
      <GithubActivityList activities={activities}/>
      {
      //<div>
        //<p>Subscribe to get monthly notification about top projects</p>
        //<input type="" /><button>Subscribe</button>
      //</div>
      }
    </section>
    <footer>
      <small style={{
        float: 'right',
        marginBottom: 22
      }}>Made by <a href='https://santiment.net'>Santiment API</a>
      </small>
    </footer>
  </div>
)

export default App
