
// Material Dashboard 2 React layouts
import Dashboard from "./../screens/dashboard";
// import Tables from "./../screens/tables";
import SignIn from "./../screens/signin";
import AddCustomer from "./../screens/admin/addCustomer";
import AddSubAdmin from "./../screens/admin/addSubAdmin";
import CustomerList from "./../screens/listview/customer";
import SubAdminList from "./../screens/listview/subadmin";
import AddProduct from "./../screens/products/addProduct";
import EditProduct from "./../screens/products/editProduct";
import Orders from "./../screens/orders";
import CustomerUploads from "./../screens/customer/uploads";
import CustomerPriority from "./../screens/customer/priority";

// @mui icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LowPriorityOutlinedIcon from '@mui/icons-material/LowPriorityOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';

const routes = [
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
    icon: <RecentActorsOutlinedIcon fontSize="small">customerlist</RecentActorsOutlinedIcon>,
    route: "/customerlist",
    component: <CustomerList />,
  },
  {
    type: "collapse",
    name: "Sub-Admin List",
    key: "subadminlist",
    icon: <DnsOutlinedIcon fontSize="small">subadminlist</DnsOutlinedIcon>,
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
    icon: <PersonAddAltOutlinedIcon fontSize="small">add-customer</PersonAddAltOutlinedIcon>,
    route: "/add-customer",
    component: <AddCustomer />,
  },
  {
    type: "collapse",
    name: "Add Sub-Admin",
    key: "add-subadmin",
    icon: <SupervisorAccountOutlinedIcon fontSize="small">add-subadmin</SupervisorAccountOutlinedIcon>,
    route: "/add-subadmin",
    component: <AddSubAdmin />,
  },
  {
    type: "collapse",
    name: "Add Product",
    key: "add-product",
    icon: <UploadFileOutlinedIcon fontSize="small">add-product</UploadFileOutlinedIcon>,
    route: "/add-product",
    component: < AddProduct />,
  },
  {
    type: "collapse",
    name: "Edit Product",
    key: "edit-product",
    icon: <Inventory2OutlinedIcon fontSize="small">edit-product</Inventory2OutlinedIcon>,
    route: "/edit-product",
    component: < EditProduct />,
  },
  {
    type: "collapse",
    name: "Orders",
    key: "order",
    icon: <ShoppingBagOutlinedIcon fontSize="small">order</ShoppingBagOutlinedIcon>,
    route: "/orders",
    component: < Orders />,
  },
  {
    type: "collapse",
    name: "Customer Uploads",
    key: "customer-uploads",
    icon: <CloudUploadOutlinedIcon fontSize="small">customer-uploads</CloudUploadOutlinedIcon>,
    route: "/customer-uploads",
    component: < CustomerUploads />,
  },
  {
    type: "collapse",
    name: "Customer Priority",
    key: "customer-priority",
    icon: <LowPriorityOutlinedIcon fontSize="small">customer-priority</LowPriorityOutlinedIcon>,
    route: "/customer-priority",
    component: < CustomerPriority />,
  },
  {
    type: "collapse",
    name: "Log out",
    key: "log-out",
    icon: <LogoutOutlinedIcon fontSize="small">log-out</LogoutOutlinedIcon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export default routes;
