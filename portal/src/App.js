import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { HomePage, LoginPage, Nav, Polling, PrivateComponent, PrivateRoute } from './components';

const Profile = () => (
  <div>
    Profile
  </div>
)

const App = () => (
  <div className="app">
    <Router>
      <div>
        <PrivateComponent component={Nav} />
        <PrivateComponent component={Polling} />
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path='/login' component={LoginPage} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
