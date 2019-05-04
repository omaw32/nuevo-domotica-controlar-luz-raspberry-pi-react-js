import axios        from 'axios';
import { userConstants } from '../constants';
import { userActions } from '../actions';
import { history } from '../helpers'
export default {
  setupInterceptors: (store) => {

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        //catches if the session ended!
        console.log(error)
        if (error.response.status === 401 || error.response.status === 403) {
            console.log("EXPIRED TOKEN!");
            localStorage.clear();
            userActions.logout();
            store.dispatch({ type: userConstants.LOGOUT });
            history.push('/login')
        }
        /*if ( error.response.data.token.KEY == 'ERR_EXPIRED_TOKEN') {
            console.log("EXPIRED TOKEN!");
            localStorage.clear();
            userService.logout();
            store.dispatch({ type: userConstants.LOGOUT });
        }*/
        return Promise.reject(error);
    });

  }
};