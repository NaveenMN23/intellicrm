import { useState, useEffect } from "react";
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";


// Material Dashboard 2 React components
import MDBox from "./../../components/MDBox";
import MDTypography from "./../../components/MDTypography";
import MDInput from "./../../components/MDInput";
import MDButton from "./../../components/MDButton";

// Authentication layout components
import BasicLayout from "./../signin/components/SignInLayout";

// Images
import bgImage from "./../../assets/images/bg-sign-in-basic.jpeg";
import { useNavigate } from "react-router-dom";

import {APIService} from "./../../services/rootService";
import {EndPoints, RequestType} from "./../../services/apiConfig";
import { useMaterialUIController,setLoginUserId,setLoginUserRole,setcanEditCustomer, setcanEditProducts, setcanEditOrders } from "./../../context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValue = {
  Username: "",
  password: ""
}

function Basic() {
  const [controller, dispatch] = useMaterialUIController();

  const { LoginUserId  } = controller;

  const [rememberMe, setRememberMe] = useState(false);

  const [userData, setUserData] = useState(initialValue);

  const notify = (message) => toast(message);

  useEffect(() => {
    if(LoginUserId != '')
    {
      setUserData({Username :LoginUserId});
      navigate(`/Dashboard`, { state: "userData" })
    }
    // localStorage.removeItem("userEmail");
  });

  // Navigate module
  let navigate = useNavigate();

  const handleChange = (e) => {
    const data = e.target.value;
    setUserData(
      {
        Username : e.target.id == "Username" ? data : userData.Username,
        password:e.target.id != "Username" ? data : userData.password
      }
    )
  }

  // const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      handleSubmit();
    }
  }

  const handleSubmit = async () => {
    console.debug(userData);
    const {Username, password} = userData;
    localStorage.setItem("userEmail",JSON.stringify(Username));

    const resp = await APIService(EndPoints.SIGN_IN , RequestType.POST,userData);

    if(resp.status == 200)
    {
      setLoginUserId(dispatch, Username);
      setLoginUserRole(dispatch, resp.data.role);
      setcanEditCustomer(dispatch, resp.data.canEditCustomer);
      setcanEditOrders(dispatch, resp.data.canEditOrders);
      setcanEditProducts(dispatch, resp.data.canEditProducts);

      notify("Logged in successful");
      setTimeout(() => {
        navigate(`/Dashboard`, { state: "userData" })
      }, 2000)

    }
    else if (resp.status === 500) {
      notify("Some error occured");
    }
    else {
      notify(resp.data.message);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Intelli CRM
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" id="Username" label="User ID" required="true" onKeyPress={handleKeyPress} onChange={handleChange} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" id="password" label="Password" required="true" onKeyPress={handleKeyPress} onChange={handleChange} fullWidth />
            </MDBox>
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
              {
  "token": "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBnYW1pbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJhZG1pbiIsImp0aSI6ImNmYzM2ZTU0LTY3NzQtNGJkYS05MWZiLWNhNmM4YWJmYjkxZCIsImV4cCI6MTY2MDU0Njg4NSwiaXNzIjoiZGV2ZWxvcG1lbnRJc3N1ZXIiLCJhdWQiOiJkZXZlbG9wbWVudEF1ZGllbmNlIn0.yE_04R_LoegEnz3HC3xhJysRTFzajf_dTK5CqSRotnk",
  "expirationDate": "2022-08-15T05:01:53.745Z",
  "refreshToken": "string"
}
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={handleSubmit} onKeyPress={handleKeyPress} fullWidth >
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
