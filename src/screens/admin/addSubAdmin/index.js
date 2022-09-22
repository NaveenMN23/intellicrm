// react-router-dom components
import { Link } from "react-router-dom";
import bcrypt from 'bcryptjs';

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "./../../../components/MDBox";
import MDTypography from "./../../../components/MDTypography";
import MDInput from "./../../../components/MDInput";
import MDButton from "./../../../components/MDButton";

// Authentication layout components
import CoverLayout from "./../components/CoverLayout";
import DashboardLayout from "./../../../components/DashboardLayout";
import DashboardNavbar from "./../../../components/DashboardNavbar";
import { InputLabel } from '@mui/material';

import React, { useState, useEffect } from 'react';

import { useLocation, useParams } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom";

import {APIService} from "./../../../services/rootService";
import {EndPoints, RequestType} from "./../../../services/apiConfig";

// Images
import bgImage from "./../../../assets/images/bg-sign-up-cover.jpeg";

const initialValues = {
  userId:0,
  firstName: "",
  lastName: "",
  email: "",
  password:"",
  contactNumber: "",
  canEditCustomer: true,
  canEditProducts: true,
  canEditOrders: true,
}

function AddSubAdmin() {

  // Navigate module
  let navigate = useNavigate();

  const [subAdminDetails, setSubAdminDetails] = useState(initialValues);

  const notify = (message) => toast(message);

  // To get the props from previous page
  const { state } = useLocation();

  const fetchSubAdminDetails = async () => {

    const resp = await APIService(EndPoints.FETCH_SUBADMIN_DETAILS +'?email='+state, RequestType.GET);

    if(resp.status == 200)
    {
      setSubAdminDetails(resp.data);
    }
  }

  useEffect(() => {
    if(state != null){
      console.log("came here");
      fetchSubAdminDetails();
    }
  }, [state])

  const handleInputChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;

    setSubAdminDetails({
      ...subAdminDetails,
      [name]: [value],
    });
  }

  const handleCheckboxChange = (e) => {
    const {name, checked} = e.target;
    console.log(name, checked);
    e.preventDefault();
    setSubAdminDetails({
      ...subAdminDetails,
      [name]: checked,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {firstName, lastName, email, password, contactNumber, canEditCustomer, canEditProducts, canEditOrders} = subAdminDetails;

    // SALT should be created ONE TIME upon sign up
    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password[0], salt); // hash created previously created upon sign up

    const formData = new FormData();

    formData.append("FirstName", firstName);
    formData.append("LastName", lastName);
    formData.append("Email", email);
    formData.append("Salt",salt);
    formData.append("Password",hashedPassword.toString());
    formData.append("ContactNumber", contactNumber);
    formData.append("canEditCustomer", canEditCustomer);
    formData.append("canEditProducts", canEditProducts);
    formData.append("canEditOrders", canEditOrders);
    formData.append("Role", "subadmin");
    formData.append("RequestedBy", JSON.parse(localStorage.getItem("userEmail")));
    formData.append("AccountType", 2);
    formData.append("AccountStatus", "active");


    console.log(subAdminDetails)

    const resp = await APIService(EndPoints.SAVE_SUBADMIN_DETAILS, RequestType.POST, formData);
    if(resp.status == 200){
      notify("Sub Admin details saved or updated successfully");
      setTimeout(() => {
        navigate('/subadminlist')
      }, 2000);
    } else {
       notify("An error occured");
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
    {/* <CoverLayout image={bgImage}> */}
    <MDBox pt={6} pb={3} sx={{display:"flex", alignItems:"center",
          flexFlow:"column"}}>
        <Grid container spacing={6} sx={{width:'60%'}}>
          <Grid item xs={12}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Save Sub-Admin
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput type="text" name="firstName" value={subAdminDetails.firstName}
                onChange={handleInputChange} required="true" label="First Name" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" name="lastName" value={subAdminDetails.lastName}
                onChange={handleInputChange} required="true" label="Last Name" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" name="email" value={subAdminDetails.email}
                onChange={handleInputChange} required="true" label="Email" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
            <MDInput type="password" name="password" value={subAdminDetails.password}
              onChange={handleInputChange} required="true" label="Password" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="phone" name="contactNumber" value={subAdminDetails.contactNumber}
                onChange={handleInputChange} required="true" label="Contact No" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <InputLabel sx={{lineHeight: '3em'}}>Rights for Customer Account</InputLabel>
              <MDBox mb={2} sx={{height: '1em'}}>
                <InputLabel >Can Edit Customer
                  <Checkbox checked={subAdminDetails.canEditCustomer} name="canEditCustomer"
                  onChange={handleCheckboxChange}/>
                </InputLabel>
              </MDBox>
              <MDBox mb={2} sx={{height: '1em'}}>
                <InputLabel >Can Edit Products
                  <Checkbox checked={subAdminDetails.canEditProducts} name="canEditProducts"
                  onChange={handleCheckboxChange}/>
                </InputLabel>
              </MDBox>
              <MDBox mb={2} sx={{height: '1em'}}>
                <InputLabel >Can Edit Orders
                  <Checkbox checked={subAdminDetails.canEditOrders} name="canEditOrders"
                  onChange={handleCheckboxChange}/>
                </InputLabel>
              </MDBox>
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" type="submit" fullWidth>
                Create/Save User
              </MDButton>
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
      </Grid>
        </Grid>
        </MDBox>
    {/* </CoverLayout> */}
    </DashboardLayout>
  );
}

export default AddSubAdmin;
