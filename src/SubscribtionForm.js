import React from 'react'

const API_URL = 'https://us-central1-buidlheroes.cloudfunctions.net'

class SubscribtionForm extends React.Component {
  state = {
    email: undefined 
  }

  handleSubmit = event => {
    event.preventDefault()
    const http = new XMLHttpRequest()
    http.open('GET', API_URL + `/addSubscriber?email=${this.state.email}`)
    http.send();
    http.onreadystatechange = e => {
      console.log(http.responseText)
    }
  }

  handleChange = event => {
    this.setState({email: event.target.value})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Get these stats delivered to your inbox every month</p>
        <input type='email' placeholder='email' onChange={this.handleChange} />
        <input type='submit' value='send' />
      </form>
    )
  }
}

export default SubscribtionForm
