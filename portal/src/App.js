import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Chart, LoginPage, Nav, PrivateComponent, PrivateRoute } from './components';

const Home = () => (
  <div className='row'>
    <div className="offset-2 col-6 mt-5">
      <Chart title='what'/>
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
