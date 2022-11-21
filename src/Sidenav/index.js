/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// react-router-dom components
import { useLocation, useNavigate, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "./../components/MDBox";
import MDTypography from "./../components/MDTypography";
import MDButton from "./../components/MDButton";

// Material Dashboard 2 React example components
import SidenavCollapse from "./SidenavCollapse";

// Custom styles for the Sidenav
import SidenavRoot from "./SidenavRoot";
import sidenavLogoLabel from "./styles/sidenav";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "./../context";
import {APIService} from "./../services/rootService";
import {EndPoints, RequestType} from "./../services/apiConfig";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor,LoginUserId, LoginUserRole,canEditCustomer,canEditOrders,canEditProducts } = controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");

  const [renderRoutes, setRenderRoutes] = useState(null);


  //const Admin = ['sign-in','dashboard','customer-list','sub-admin-list','add-customer','add-subadmin','add-product','edit-product','view-order','add-order','customer-uploads','customer-priority','log-out'];
  const subAdmin = ['sign-in','dashboard','customer-list','sub-admin-list','add-customer','add-subadmin','add-product','edit-product','view-order','add-order','customer-uploads','customer-priority','log-out']
  const customer = ['sign-in','dashboard','add-order','view-order','edit-product','soa','log-out'];

  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {

    // if(canEditCustomer!==true)
    //    subAdmin.splice(subAdmin.indexOf('add-customer'), 1);
    // if(canEditOrders!==true)
    //     subAdmin.splice(subAdmin.indexOf('add-order'), 1);
    //  if(canEditProducts!==true)
    //     subAdmin.splice(subAdmin.indexOf('add-product'), 1);

    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    /**
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if(userEmail === '' || userEmail === null || userEmail === undefined){
      navigate('/log-out');
    }
  });

  useEffect(() => {
    fetchCustomerDetails();
  },[]);

    const fetchCustomerDetails = async () => {

    console.log(LoginUserRole);
    const resp = await APIService(EndPoints.FETCH_CUSTOMER_DETAILS +'?email='+localStorage.getItem("userEmail"), RequestType.GET).then(

      (resp) =>
                {
                  if(resp.status === 200)
                  {
                    if(resp.data.role == "subadmin" )
                    {
                      if(resp.data.canEditCustomer!==true)
                        subAdmin.splice(subAdmin.indexOf('add-customer'), 1);
                      if(resp.data.canEditOrders!==true)
                        subAdmin.splice(subAdmin.indexOf('add-order'), 1);
                      if(resp.data.canEditProducts!==true)
                        subAdmin.splice(subAdmin.indexOf('add-product'), 1);
                    }

                    const route = routes.map(({ type, name, icon, title, noCollapse, key, href, route }) => {

                      if(resp.data.role == "subadmin" )
                      {
                        // if((key=='add-customer' && !canEditCustomer ))
                        //   return;
                        // if((key=='add-product' && !canEditProducts ))
                        //   return;
                        // if((key=='add-order' && !canEditOrders ))
                        // return;
                        if (!subAdmin.includes(key)  )
                        {
                          return;
                        }
                      }
                      if(resp.data.role === "customer" )
                      {
                        if (!customer.includes(key))
                        {
                          return;
                        }
                      }
                      if(resp.data.role === "admin")
                      {
                        if(key === 'soa'){
                          return;
                        }
                      }

                      let returnValue;

                      if (type === "collapse") {
                        returnValue = href ? (
                          <Link
                            href={href}
                            key={key}
                            target="_blank"
                            rel="noreferrer"
                            sx={{ textDecoration: "none" }}
                          >
                            <SidenavCollapse
                              name={name}
                              icon={icon}
                              active={key === collapseName}
                              noCollapse={noCollapse}
                            />
                          </Link>
                        ) : (
                          <NavLink key={key} to={route}>
                            <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
                          </NavLink>
                        );
                      } else if (type === "title") {
                        returnValue = (
                          <MDTypography
                            key={key}
                            color={textColor}
                            display="block"
                            variant="caption"
                            fontWeight="bold"
                            textTransform="uppercase"
                            pl={3}
                            mt={2}
                            mb={1}
                            ml={1}
                          >
                            {title}
                          </MDTypography>
                        );
                      } else if (type === "divider") {
                        returnValue = (
                          <Divider
                            key={key}
                            light={
                              (!darkMode && !whiteSidenav && !transparentSidenav) ||
                              (darkMode && !transparentSidenav && whiteSidenav)
                            }
                          />
                        );
                      }

                      return returnValue;
                    });

                    setRenderRoutes(route);
                  }

                }

    );
  };


  // Render all the routes from the routes.js (All the visible items on the Sidenav)

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && <MDBox component="img" src={brand} alt="Brand" width="2rem" />}
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography component="h6" variant="button" fontWeight="medium" color={textColor}>
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      {renderRoutes && <List>{renderRoutes}</List>}
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
