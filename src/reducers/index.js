import { combineReducers } from "redux";

import { alert } from "./alert.reducer";
import { authentication } from "./authentication.reducer";

const rootReducer = combineReducers({
  alert,
  authentication
});

export default rootReducer;
