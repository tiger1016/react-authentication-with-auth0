import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import auth0Client from '../Auth'
import axios from 'axios'

const NewQuestion = props => {
  const [disabled, setDisabled] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const submit = async () => {
    setDisabled(true);
    await axios.post('http://localhost:8081', {
      title,
      description
    }, {
      headers: {
        'Authorization': `Bearer ${auth0Client.getIdToken()}`
      }
    });

    props.history.replace('/');
  }

  return (
    <div className='container'>
      <div className="row">
        <div className="col-12">
          <div className='card border-primary'>
            <div className="card-header">New Question</div>
            <div className='card-body text-left'>
              <div className='form-group'>
                <label htmlFor="exampleInputEmail">Title:</label>
                <input
                  disabled={disabled}
                  type='text'
                  onBlur={e => setTitle(e.target.value)}
                  className='form-control'
                  placeholder="Give your question a title."
                >
                </input>
              </div>
              <div className='form-group'>
                <label htmlFor="exampleInputEmail1">Description:</label>
                <input
                  disabled={disabled}
                  type='text'
                  onBlur={e => setDescription(e.target.value)}
                  className='form-control'
                  placeholder="give more context to your question."
                >
                </input>
              </div>
              <button
                disabled={disabled}
                className="btn btn-primary"
                onClick={submit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(NewQuestion)