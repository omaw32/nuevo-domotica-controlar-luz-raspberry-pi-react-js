import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
// import { users } from './Arquitectura/users.reducer';
import { alert } from './alert.reducer';
// import { usuario } from './Arquitectura/usuario.reducer';
// import { transaccion } from './Arquitectura/transaccion.reducer';
// import { documento } from './Arquitectura/documento.reducer';
// import { body } from './body.reducer';
// import { header } from './header.reducer';

const rootReducer = combineReducers({
  authentication
//   , users
  , alert
//   , body
//   , header
//   , usuario
//   , transaccion
//   , documento
});

export default rootReducer;