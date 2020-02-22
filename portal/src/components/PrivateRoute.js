
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    const { loggedIn } = state.authReducer;
    return { isLoggedIn: loggedIn };
};
/** Redirects an unathenticated user to login page */
const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
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

export default connect(mapStateToProps, null)(PrivateRoute);