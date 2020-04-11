import { alertConstants } from "../constants";
const defaultState = {
  color: "",
  message: "",
  open: false
};

export function alert(state = defaultState, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        color: "success",
        message: action.message,
        open: true
      };
    case alertConstants.ERROR:
      console.log("llegueee");
      return {
        color: "danger",
        message: action.message,
        open: true
      };
    case alertConstants.WARNING:
      return {
        color: "warning",
        message: action.message,
        open: true
      };
    case alertConstants.INFO:
      return {
        color: "info",
        message: action.message,
        open: true
      };
    case alertConstants.CLEAR:
      return {
        type: "",
        message: "",
        open: false
      };

    default:
      return state;
  }
}
