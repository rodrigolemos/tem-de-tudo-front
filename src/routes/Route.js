import React from 'react';
import { Route as ReactRouterDOM, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

const Route = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <ReactRouterDOM
      {...rest}
      render={props => {
        return isPrivate === !!user ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: isPrivate ? '/' : '/dashboard',
                state: { from: props.location },
              }}
            />
          );
      }}
    />
  );
}

export default Route;