import React from 'react'
import debounce from 'lodash.debounce'
import './SubscribtionForm.css'

const API_URL = 'https://us-central1-buidlheroes.cloudfunctions.net'

class SubscribtionForm extends React.Component {
  state = {
    email: undefined,
    isPending: false,
    isSuccess: false
  }

  handleSubmit = event => {
    event.preventDefault()
    this.sendEmail()
  }

  sendEmail = debounce(() => { 
    this.setState({isPending: true});
    const http = new XMLHttpRequest()
    http.open('GET', API_URL + `/addSubscriber?email=${this.state.email}`)
    http.send();
    http.onreadystatechange = e => {
      this.setState({isSuccess: true})
    }
  }, 500)

  handleChange = event => {
    this.setState({email: event.target.value})
  }

  render() {
    const { isPending, isSuccess } = this.state
    if (isSuccess) {
      return (
        <div className='subscribtion-form-success'>
          <p>You have subscribed&nbsp;
            <span aria-label='party' role='img'>🎉</span>
            <span aria-label='party' role='img'>🎉</span>
            <span aria-label='party' role='img'>🎉</span>
          </p>
          <p><strong>Thank you</strong></p>
        </div>
      )
    }
    return (
      <form className='subscribtion-form' onSubmit={this.handleSubmit}>
        <p className='subscribtion-form__description'>Get these stats delivered to your inbox every month</p>
        <input className='subscribtion-form__input' type='email' placeholder='email' onChange={this.handleChange} />
        <br />
        <input className='subscribtion-form__submit' disabled={isPending} type='submit' value={isPending ? 'sending...' : 'send'} />
      </form>
    )
  }
}

export default SubscribtionForm
