
// Material Dashboard 2 React layouts
import Dashboard from "./../screens/dashboard";
// import Tables from "./../screens/tables";
import SignIn from "./../screens/signin";
import LogOut from "./../screens/logout";
import AddCustomer from "./../screens/admin/addCustomer";
import AddSubAdmin from "./../screens/admin/addSubAdmin";
import CustomerList from "./../screens/listview/customer";
import SubAdminList from "./../screens/listview/subadmin";
import AddProduct from "./../screens/products/addProduct";
import EditProduct from "./../screens/products/editProduct";
import AddOrder from "./../screens/orders/addOrder";
import ViewOrder from "./../screens/orders/viewOrder";
import TrackingNumber from './../screens/orders/trackingNumber';
import OrderReport from './../screens/orders/orderReport';
import CustomerUploads from "./../screens/customer/uploads";
import CustomerPriority from "./../screens/customer/priority";
import Soa from "./../screens/customer/soa";

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
import PaymentsIcon from '@mui/icons-material/Payments';
import AddIcon from '@mui/icons-material/Add';
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
    key: "customer-list",
    icon: <RecentActorsOutlinedIcon fontSize="small">customer-list</RecentActorsOutlinedIcon>,
    route: "/customer-list",
    component: <CustomerList />,
  },
  {
    type: "collapse",
    name: "Sub-Admin List",
    key: "sub-admin-list",
    icon: <DnsOutlinedIcon fontSize="small">sub-admin-list</DnsOutlinedIcon>,
    route: "/sub-admin-list",
    component: <SubAdminList />,
  },
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
    name: "Add Orders",
    key: "add-order",
    icon: <AddIcon fontSize="small">add-order</AddIcon>,
    route: "/add-order",
    component: < AddOrder />,
  },
  {
    type: "collapse",
    name: "View Orders",
    key: "view-order",
    icon: <ShoppingBagOutlinedIcon fontSize="small">view-order</ShoppingBagOutlinedIcon>,
    route: "/view-order",
    component: < ViewOrder />,
  },
  {
    type: "collapse",
    name: "Update Trackingno",
    key: "update-trackingno",
    icon: <ShoppingBagOutlinedIcon fontSize="small">update-trackingno</ShoppingBagOutlinedIcon>,
    route: "/update-trackingno",
    component: < TrackingNumber />,
  },
  {
    type: "collapse",
    name: "Order Report",
    key: "order-report",
    icon: <ShoppingBagOutlinedIcon fontSize="small">order-report</ShoppingBagOutlinedIcon>,
    route: "/order-report",
    component: < OrderReport />,
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
    name: "SOA",
    key: "soa",
    icon: <PaymentsIcon fontSize="small">customer-priority</PaymentsIcon>,
    route: "/soa",
    component: < Soa />,
  },
  {
    type: "collapse",
    name: "Log out",
    key: "log-out",
    icon: <LogoutOutlinedIcon fontSize="small">log-out</LogoutOutlinedIcon>,
    route: "/logout",
    component: <LogOut />,
  },
];

export default routes;
