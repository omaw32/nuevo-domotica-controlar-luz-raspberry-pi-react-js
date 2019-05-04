// import Pages from "layouts/Pages.jsx";
// import RTL from "layouts/RTL.jsx";
import Dashboard from "layouts/Admin.jsx";
// import Usuarios from "layouts/Usuarios.jsx";

var indexRoutes = [
  // { path: "/rtl", name: "RTL", component: RTL },
//   { path: "/recuperar-clave", name: "Recuperar Clave", component: Pages },
//   { path: "/solicitud-recuperacion-clave", name: "Solicitud Recuperacion Clave", component: Usuarios },
  { path: "/", name: "Home", component: Dashboard }
];

export default indexRoutes;