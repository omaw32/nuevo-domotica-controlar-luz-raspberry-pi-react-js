import React from "react";
import PropTypes from "prop-types";
//import { Route, Redirect } from 'react-router-dom';
import { Route } from "react-router-dom";
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} />} />
);

PrivateRoute.propTypes = {
  component: PropTypes.any
};
