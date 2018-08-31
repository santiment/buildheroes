import gql from 'graphql-tag'
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'https://api.santiment.net/graphql'
})

const mapDataToActivities = ({data = { allProjects: [] }}) => 
  [...data.allProjects]
    .sort((a, b) => a.averageDevActivity - b.averageDevActivity)
    .reverse()
    .filter((_, index) => index < 10)
    .map(activity => ({
      ...activity,
      activity: activity.averageDevActivity.toFixed(2)
    }))

export default function getGithubActivity() {
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
