import React from 'react'
import './SubscribtionForm.css'

const API_URL = 'https://us-central1-buidlheroes.cloudfunctions.net'

class SubscribtionForm extends React.Component {
  state = {
    email: undefined,
    isSendSuccess: false
  }

  handleSubmit = event => {
    event.preventDefault()
    const http = new XMLHttpRequest()
    http.open('GET', API_URL + `/addSubscriber?email=${this.state.email}`)
    http.send();
    http.onreadystatechange = e => {
      this.setState({isSendSuccess: true})
    }
  }

  handleChange = event => {
    this.setState({email: event.target.value})
  }

  render() {
    if (this.state.isSendSuccess) {
      return (
        <div className='subscribtion-form-success'>
          <p>You have subscribed 🎉🎉🎉</p>
          <p><strong>Thank you</strong></p>
        </div>
      )
    }
    return (
      <form className='subscribtion-form' onSubmit={this.handleSubmit}>
        <p className='subscribtion-form__description'>Get these stats delivered to your inbox every month</p>
        <input className='subscribtion-form__input' type='email' placeholder='email' onChange={this.handleChange} />
        <input className='subscribtion-form__submit' type='submit' value='send' />
      </form>
    )
  }
}

export default SubscribtionForm
