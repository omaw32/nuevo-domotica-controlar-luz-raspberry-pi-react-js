import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store } from "./helpers";
import { App } from "./app";
import "./assets/css/material-dashboard-react.css?v=1.6.0";
import interceptors from "./helpers/interceptors";

interceptors.setupInterceptors(store);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
