import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import auth0Client from '../Auth'

const SubmitAnswer = props => {
  const [answer, setAnswer] = useState('')

  const submit = () => {
    props.submitAnswer(answer);
    setAnswer('');
  }

  if (!auth0Client.isAuthenticated()) return null;
  return (
    <>
      <div className='form-group text-center'>
        <label htmlFor="exampleInputEmail1">Answer:</label>
        <input
          type='text'
          onChange={e => setAnswer(e.target.value)}
          className='form-control'
          placeholder="Share your answer."
          value={answer}
        >
        </input>
      </div>
      <button
        className='btn btn-primary'
        onClick={submit}
      >
        Submt
      </button>
      <hr className='my-4'></hr>
    </>
  )
}


export default withRouter(SubmitAnswer)