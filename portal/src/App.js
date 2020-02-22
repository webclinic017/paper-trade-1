import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import './App.css';
import { Chart, Nav, PrivateComponent, PrivateRoute } from './components';

const Home = () => (
  <div>
    homepage
    <Chart />
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
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
