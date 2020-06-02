import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import auth0Client from './Auth'

const Callback = (props) => {
  useEffect(() => {
    const auth = async () => {
      await auth0Client.handleAuthentication();
      props.history.replace('/');
    }
    auth();
  }, [props])

  return (
    <p>Loading Profile...</p>
  )
}

export default withRouter(Callback);