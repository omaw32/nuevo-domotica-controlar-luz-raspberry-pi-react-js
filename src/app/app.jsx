import React from "react";
import { Login } from "../views";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { alertActions } from "../actions";
import indexRoutes from "../routes/index.jsx";
import { history, PrivateRoute } from "../helpers";
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "../components/Snackbar/Snackbar.jsx";
import { Router, Route, Switch } from "react-router-dom";
import setAuthorizationToken from "../helpers/setAuthorizationToken";
class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      console.log(location, action);
      //clear alert on location change
      dispatch(alertActions.clear());
    });
  }
  render() {
    setAuthorizationToken();
    const { dispatch } = this.props;
    const { alert } = this.props;
    return (
      <div>
        {alert.message && (
          <Snackbar
            place="tr"
            color={alert.color}
            message={alert.message}
            icon={AddAlert}
            open={alert.open}
            closeNotification={() => dispatch(alertActions.clear())}
            close
          />
        )}
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            {indexRoutes.map((prop, key) => {
              return (
                <PrivateRoute
                  path={prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
          </Switch>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.any,
  alert: PropTypes.any
};

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
