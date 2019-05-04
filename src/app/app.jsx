import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { history, PrivateRoute } from 'helpers'
import { alertActions } from 'actions'
import { Login } from "views"
import indexRoutes from "routes/index.jsx"
import Snackbar from "components/Snackbar/Snackbar.jsx"
import setAuthorizationToken from 'helpers/setAuthorizationToken'
import AddAlert from "@material-ui/icons/AddAlert";
class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            //clear alert on location change
            dispatch(alertActions.clear());
        });
    }   
    render() {  
        setAuthorizationToken()
        const { dispatch } = this.props;
        const { alert } = this.props;
        return (               
            <div>
                {alert.message && <Snackbar
                        place="tr"
                        color={ alert.color }
                        message={ alert.message }
                        icon={AddAlert}
                        open={ alert.open }
                        closeNotification={()=>dispatch(alertActions.clear())}                                                
                        close
                      />}          
                    <Router history={history}>
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route path="/login" component={Login} />
                            {indexRoutes.map((prop, key) => {
                                return <PrivateRoute path={prop.path} component={prop.component} key={key} />;
                            })}
                        </Switch>
                    </Router>
            </div>               
            
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 