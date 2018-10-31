import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({onUnauthorizedAccess, userIsLogged, component: Component, ...rest}) => (
  <Route {...rest} render={
    (props) => {
      if(userIsLogged){
        return (<Component {...props}/>)
      } else {
        onUnauthorizedAccess()
        return (<Redirect to="/login"/>)
      }
    }
  } />
)