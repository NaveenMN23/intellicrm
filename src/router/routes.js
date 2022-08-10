
// Material Dashboard 2 React layouts
import Dashboard from "./../screens/dashboard";
// import Tables from "./../screens/tables";
import SignIn from "./../screens/signin";
import CreateUser from "./../screens/admin/createUser";

// @mui icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <DashboardOutlinedIcon fontSize="small">dashboard</DashboardOutlinedIcon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  // {
  //   type: "collapse",
  //   name: "User List",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },

  {
    type: "collapse",
    name: "Create User",
    key: "sign-up",
    icon: <PersonAddAltOutlinedIcon fontSize="small">assignment</PersonAddAltOutlinedIcon>,
    route: "/create-user",
    component: <CreateUser />,
  },
  {
    // type: "collapse",
    name: "Sign In",
    key: "sign-in",
    // icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Log out",
    key: "log-out",
    icon: <LogoutOutlinedIcon fontSize="small">logout</LogoutOutlinedIcon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export default routes;
