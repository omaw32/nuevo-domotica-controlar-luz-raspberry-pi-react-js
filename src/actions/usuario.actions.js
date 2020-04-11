import { userConstants, estadoUsuarioConstants } from "../constants";
import axios from "axios";
import { alertActions } from "actions";
import { history } from "../helpers";

export const userActions = {
  login,
  logout,
  fakeLoginApi
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    loginApi(username, password).then(
      user => {
        let mostrarError = "";
        if (user.Intentos === 1) {
          mostrarError = "Usuario o Clave no válido";
        } else if (user.Intentos === 2) {
          mostrarError = "Su clave se bloqueará al tercer intento fallido";
        } else if (
          user.Intentos >= 3 &&
          user.IdEstadoUsuario === estadoUsuarioConstants.BLOQUEADO
        ) {
          mostrarError = "El usuario ha sido bloqueado por exceso de intentos";
        } else if (
          user.IdEstadoUsuario === estadoUsuarioConstants.DESHABILITADO
        ) {
          mostrarError =
            "El usuario está deshabilitado, contacte al Administrador";
        } else {
          dispatch(success(user));
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("user", JSON.stringify(user));
          history.push("/solicitud");
        }

        if (mostrarError !== "") {
          dispatch(alertActions.error(mostrarError));
          setTimeout(function() {
            dispatch(alertActions.clear());
          }, 6000);
        }
      },
      error => {
        dispatch(alertActions.error("Usuario o Clave no válido"));
        console.log(error);
        setTimeout(function() {
          dispatch(alertActions.clear());
        }, 6000);
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  //function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
  return { type: userConstants.LOGOUT };
}

function loginApi(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //body: JSON.stringify({ grant_type, username, password })
    body: "grant_type=password&Username=" + username + "&Password=" + password
  };
  //return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
  const urlApi = "configConstants.API_GATEWAY_LOGIN_ENDPOINT";
  const apiGatewayEndpointPath = "configConstants.API_GATEWAY_ENDPOINT_PATH";
  return fetch(`${urlApi}`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user.access_token) {
        const obj = {
          Nombres: "",
          Apellidos: "",
          CorreoElectronico: "",
          RutUsuario: username,
          Clave: password
        };
        return axios
          .post(apiGatewayEndpointPath, obj, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Endpoint: "/ApiUsuarios/E-Cert-CrediAutos/LogIn",
              APIKey: "configConstants.API_USUARIOS_KEY"
            }
          }) //GetByUsername
          .then(response => {
            user.Names = response.data.User.Nombres;
            user.LastName = response.data.User.Apellidos;
            user.Picture = "assets/img/default-avatar.png";
            user.FullName =
              response.data.User.Nombres + " " + response.data.User.Apellidos;
            user.IdPerfil = response.data.User.IdPerfil;
            user.NombrePerfil = response.data.User.NombrePerfil;
            user.Intentos = response.data.User.Intentos;
            user.IdEstadoUsuario = response.data.User.IdEstadoUsuario;
            user.EstadoUsuario = response.data.User.EstadoUsuario;
            user.IdUsuario = response.data.User.IdUsuario;
            user.RutUsuario = response.data.User.RutUsuario;
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('user', JSON.stringify(user));
            return user;
          });
      }
    });
}

function fakeLoginApi(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    const user = {
      Names: "Omar",
      LastName: "Gallegos",
      Picture: "assets/img/default-avatar.png",
      FullName: "Omar Gallegos",
      IdPerfil: 1,
      NombrePerfil: "Administrador",
      Intentos: 0,
      IdEstadoUsuario: 1,
      EstadoUsuario: 1,
      IdUsuario: 1,
      RutUsuario: "15822169-1",
      Pass: password
    };
    let mostrarError = "";
    if (user.Intentos === 1) {
      mostrarError = "Usuario o Clave no válido";
    } else if (user.Intentos === 2) {
      mostrarError = "Su clave se bloqueará al tercer intento fallido";
    } else if (
      user.Intentos >= 3 &&
      user.IdEstadoUsuario === estadoUsuarioConstants.BLOQUEADO
    ) {
      mostrarError = "El usuario ha sido bloqueado por exceso de intentos";
    } else if (user.IdEstadoUsuario === estadoUsuarioConstants.DESHABILITADO) {
      mostrarError = "El usuario está deshabilitado, contacte al Administrador";
    } else {
      dispatch(success(user));
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));
      history.push("/admin/user");
    }

    if (mostrarError !== "") {
      dispatch(alertActions.error(mostrarError));
      setTimeout(function() {
        dispatch(alertActions.clear());
      }, 6000);
    }
  };
  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
