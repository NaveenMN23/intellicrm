import { useState } from "react";

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

const initialValue = {
  userId: "",
  password: ""
}

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const [userData, setUserData] = useState(initialValue);

  // Navigate module
  let navigate = useNavigate();

  const handleChange = (e) => {
    const data = e.target.value;
    setUserData(
      {
        userId : e.target.id == "userId" ? data : userData.userId,
        password:e.target.id != "userId" ? data : userData.password
      }
    )
  }

  // const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = () => {
    console.debug(userData);
    const {userId, password} = userData;
    if(userId?.toString().toLowerCase() === 'admin' && password?.toString().toLowerCase() === 'password'){
        navigate(`/create-user`, { state: "userId" })
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
              <MDInput type="text" id="userId" label="User ID" onChange={handleChange} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" id="password" label="Password" onChange={handleChange} fullWidth />
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
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={handleSubmit} fullWidth >
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
