import { alertConstants } from "../constants";

export const alertActions = {
  success,
  error,
  clear,
  info,
  warning
};

function success(message) {
  return { type: alertConstants.SUCCESS, message };
}
function error(message) {
  return { type: alertConstants.ERROR, message };
}
function info(message) {
  return { type: alertConstants.INFO, message };
}
function warning(message) {
  return { type: alertConstants.WARNING, message };
}
function clear() {
  return { type: alertConstants.CLEAR };
}
