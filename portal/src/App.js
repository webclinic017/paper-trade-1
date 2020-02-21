import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import './App.css';
import Nav from './components/Nav';
import Chart from './components/Chart';

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
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
