import axios from "axios";
import { API_URL } from "../config/environment";

function ObtenerSwitch(requestBody) {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  };

  return axios
    .post(API_URL + "/switch", requestBody, headers)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
}

function ObtenerEstadosSwitch(num) {
  return axios
    .get(API_URL + `/estados-switch`)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error + "" + num;
    });
}

export const switchActions = {
  ObtenerSwitch,
  ObtenerEstadosSwitch
};
