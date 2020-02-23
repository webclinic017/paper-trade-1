import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';
import { Chart, LoginPage, Nav, PrivateComponent, PrivateRoute } from './components';

const Home = () => (
  <div className='row'>
    <div className="offset-1 col-6">
      <Chart />
    </div>
  </div>
)

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
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path='/login' component={LoginPage} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
