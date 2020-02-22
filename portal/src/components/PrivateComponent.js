
import React from 'react'

/** Proctects a component from unathenticated users */
const PrivateComponent = ({ component: Component, props }) => {

  const isLoggedIn = false;

  return isLoggedIn ?  <Component props={props} /> : null;
}

export default PrivateComponent