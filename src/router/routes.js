
// Material Dashboard 2 React layouts
import Dashboard from "./../screens/dashboard";
// import Tables from "./../screens/tables";
import SignIn from "./../screens/signin";
import AddCustomer from "./../screens/admin/addCustomer";
import AddSubAdmin from "./../screens/admin/addSubAdmin";
import CustomerList from "./../screens/listview/customer";
import SubAdminList from "./../screens/listview/subadmin";
import Product from "./../screens/products";

// @mui icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <DashboardOutlinedIcon fontSize="small">dashboard</DashboardOutlinedIcon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Customer List",
    key: "customerlist",
    icon: <RecentActorsOutlinedIcon fontSize="small">table_view</RecentActorsOutlinedIcon>,
    route: "/customerlist",
    component: <CustomerList />,
  },
  {
    type: "collapse",
    name: "Sub-Admin List",
    key: "subadminlist",
    icon: <RecentActorsOutlinedIcon fontSize="small">table_view</RecentActorsOutlinedIcon>,
    route: "/subadminlist",
    component: <SubAdminList />,
  },
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
    name: "Add Customer",
    key: "add-customer",
    icon: <PersonAddAltOutlinedIcon fontSize="small">assignment</PersonAddAltOutlinedIcon>,
    route: "/add-customer",
    component: <AddCustomer />,
  },
  {
    type: "collapse",
    name: "Add Sub-Admin",
    key: "add-subadmin",
    icon: <PersonAddAltOutlinedIcon fontSize="small">assignment</PersonAddAltOutlinedIcon>,
    route: "/add-subadmin",
    component: <AddSubAdmin />,
  },
  {
    type: "collapse",
    name: "Product",
    key: "product",
    icon: <Inventory2OutlinedIcon fontSize="small">assignment</Inventory2OutlinedIcon
    >,
    route: "/product",
    component: < Product />,
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
