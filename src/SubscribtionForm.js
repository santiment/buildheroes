import React from 'react'

class SubscribtionForm extends React.Component {
  state = {
    email: undefined 
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log(this.state.email) 
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
