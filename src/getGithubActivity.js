import gql from 'graphql-tag'
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'https://api.santiment.net/graphql'
})

const mapDataToActivities = ({data = { allProjects: [] }}) => 
  [...data.allProjects]
    .sort((a, b) => a.averageDevActivity - b.averageDevActivity)
    .reverse()
    .filter((_, index) => index < 12)
    .map(activity => ({
      ...activity,
      activity: activity.averageDevActivity.toFixed(2)
    }))

const getXMonthAgo = (xMonthAgo = 6) => {
  const now = new Date()
  now.setMonth(now.getMonth() - xMonthAgo)
  return now.toISOString()
}

export const getGATimeseries = ({slug = 'ethereum', interval = 1}) => {
  return client
    .query({
      query: gql`
        query queryGithubActivity(
          $slug: String
          $from: DateTime
          $to: DateTime
          $interval: String
          $transform: String
          $movingAverageIntervalBase: String
        ) {
          githubActivity(
            slug: $slug
            from: $from
            to: $to
            interval: $interval
            transform: $transform
            movingAverageIntervalBase: $movingAverageIntervalBase
          ) {
            datetime
            activity
          }
        }
      `,
      variables: {
        slug,
        from: getXMonthAgo(interval),
        to: (new Date()).toISOString(),
        interval: '',
        transform: 'movingAverage',
        movingAverageIntervalBase: '1w'
      }
    })
}

export const getGithubActivity = () => {
  return client
    .query({
      query: gql`
        {
          allProjects {
            id
            slug
            averageDevActivity
            githubLink
          }
        }
      `
    })
    .then(mapDataToActivities)
}

export default getGithubActivity
