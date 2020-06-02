import React from 'react';
import './App.css';
import Navbar from './Navbar/Navbar'
import Questions from './Questions/Questions';
import Question from './Question/Question';
import { Route } from 'react-router';
import { withRouter } from 'react-router-dom'
import Callback from './Callback';
import NewQuestion from './NewQuestion/NewQuestion'
import SecuredRoute from './SecuredRoute/SecuredRoute'
import auth0Client from './Auth';

class App extends React.Component {
  async  componentDidMount() {
    if (this.props.location.pathname === '/callback') return;
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <Route exact path="/" component={Questions}></Route>
        <Route exact path='/question/:questionId' component={Question}></Route>
        <Route exact path="/callback" component={Callback}></Route>
        <SecuredRoute path='/new-question' component={NewQuestion}></SecuredRoute>
      </div>
    );
  }
}

export default withRouter(App);
