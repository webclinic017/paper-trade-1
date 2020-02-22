
import React from 'react'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { loggedIn } = state.authReducer;
  return { isLoggedIn: loggedIn };
};

/** Proctects a component from unathenticated users */
const PrivateComponent = ({ component: Component, isLoggedIn, ...rest }) => {
    return isLoggedIn ?  <Component props={rest} /> : null;
}

export default connect(mapStateToProps)(PrivateComponent);
