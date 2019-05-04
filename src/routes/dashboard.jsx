// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import ToggleOn from "@material-ui/icons/ToggleOn";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Interruptores from "views/Interruptores/Interruptores.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/interruptores",
    name: "Interruptores",
    icon: ToggleOn,
    component: Interruptores,
    layout: "/admin"
  }
];

export default dashboardRoutes;
