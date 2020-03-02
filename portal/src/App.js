import React from 'react';
import { Router , Route, Switch } from 'react-router-dom'

import { HomePage, LoginPage, Nav, Polling, PrivateComponent, PrivateRoute, StockPage } from './components';
import history from './history';

const Profile = () => (
  <div className="text-white"> 
    Profile
  </div>
)

const App = () => (
  <div className="app">
    <Router history={history}>
      <div>
        <PrivateComponent component={Nav} />
        <PrivateComponent component={Polling} />
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/stocks/:id" component={StockPage} />
          <Route path='/login' component={LoginPage} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
