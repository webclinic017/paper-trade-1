
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

/** Redirects an unathenticated user to login page */
const PrivateRoute = ({ component: Component, ...rest }) => {

  const isLoggedIn = false;

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute