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

// import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { InputLabel } from '@mui/material';

import React, { useState, useEffect } from 'react';

import pxToRem from "./../../../assets/theme/functions/pxToRem";

// Images
import bgImage from "./../../../assets/images/bg-sign-up-cover.jpeg";
import { useLocation, useParams } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom";

import {APIService} from "./../../../services/rootService";
import {EndPoints, RequestType} from "./../../../services/apiConfig";

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const initialValues = {
  userId:0,
  firstName: "",
  lastName: "",
  email: "",
  password:"",
  contactNumber: "",
  address: "",
  city: "",
  state: "",
  country: "",
  creditLimit: "",
  accountStatus: "",
  soareceviedAmount: "",
  uploadFile: ""
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  '.MuiFormControlLabel-label': checked && {
    color: theme.palette.primary.main,
  },
  '.MuiFormControlLabel-label': {
    fontWeight: 400,
    color: '#7b809a',
    lineHeight: '1.4375em',
  },
}));

// function MyFormControlLabel(props: FormControlLabelProps) {
//   const radioGroup = useRadioGroup();
//
//   let checked = false;
//
//   if (radioGroup) {
//     checked = radioGroup.value === props.value;
//   }
//
//   // setCustomerDetails({
//   //   ...customerDetails,
//   //   "accountStatus" : radioGroup.value,
//   // });
//
//   return <StyledFormControlLabel checked={checked} {...props} />;
// }

const options = [
  {
    id: 'Active',
    key: 'Active',
  },
  {
    id: 'Hold',
    key: 'Hold',
  },
];

function AddCustomer() {

  // Navigate module
  let navigate = useNavigate();

  const [customerDetails, setCustomerDetails] = useState(initialValues);

  const [selectedFile, setSelectedFile] = useState(null);

  const notify = (message) => toast(message);

  // To get the props from previous page
  const { state } = useLocation();

  //Fetch Customer Details
  const fetchCustomerDetails = async () => {

    const resp = await APIService(EndPoints.FETCH_CUSTOMER_DETAILS +'/'+state, RequestType.GET);

    if(resp.status == 200)
    {
      setCustomerDetails(resp.data);
    }
  }

  useEffect(() => {
    if(state != null){
      console.log("came here");
      fetchCustomerDetails();
    }
  }, [state])

  const handleCheckboxChange = (e) => {
    const id = e.target.value.toString();
    const option = options.find((o) => o.id === id);
    setCustomerDetails({
      ...customerDetails,
      "accountStatus" : option.value,
    });
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;

    setCustomerDetails({
      ...customerDetails,
      [name]: [value],
    });
  }

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  }

  const handleFileUpload = (e) => {
    e.preventDefault();
    setCustomerDetails({
      ...customerDetails,
      "uploadFile" :  selectedFile,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {firstName, lastName, email, password, contactNumber, address, city, state, country,
      creditLimit, accountStatus, soareceviedAmount, uploadFile} = customerDetails;

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
    formData.append("AccountStatus", accountStatus);
    formData.append("Address", address);
    formData.append("City", city);
    formData.append("State", state);
    formData.append("Country", country);
    formData.append("AccountType", 1);
    formData.append("CreditLimit", creditLimit);
    formData.append("SoareceviedAmount", soareceviedAmount);
    formData.append("UploadFile", uploadFile);
    formData.append("Role", "customer");
    formData.append("RequestedBy", JSON.parse(localStorage.getItem("userEmail")));

    console.log(formData)

    const resp = await APIService(EndPoints.SAVE_CUSTOMER_DETAILS, RequestType.POST, formData);
    if(resp.status == 200){
      notify("Customer details saved or updated successfully");
       setTimeout(() => {
        navigate('/customerlist')
      }, 2000);
    } else {
       notify("An error occured");
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
    {/* <CoverLayout image={bgImage}> */}
    <ToastContainer />
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
            Save Customer
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput type="text" name="firstName" value={customerDetails.firstName}
                onChange={handleInputChange} label="First Name" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" name="lastName" value={customerDetails.lastName}
                onChange={handleInputChange} label="Last Name" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" name="email" value={customerDetails.email}
                onChange={handleInputChange} label="Email" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" name="password" value={customerDetails.password}
                onChange={handleInputChange} label="Password" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="phone" name="contactNumber" value={customerDetails.contactNumber}
                onChange={handleInputChange} label="Contact No" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" name="address" value={customerDetails.address}
                onChange={handleInputChange} label="Address" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" name="city" value={customerDetails.city}
                onChange={handleInputChange} label="City" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" name="state" value={customerDetails.state}
                onChange={handleInputChange} label="State" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" name="country" value={customerDetails.country}
                onChange={handleInputChange} label="Country" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="number" name="creditLimit" value={customerDetails.creditLimit}
                onChange={handleInputChange} label="Credit Limit" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <InputLabel sx={{lineHeight: '2.4375em'}}>Account Status</InputLabel>
              <RadioGroup name="use-radio-group" defaultValue="first" onChange={handleCheckboxChange}>
                {options.map((o) => (
                  <FormControlLabel value={o.id} label={o.key} key={o.key} control={<Radio />} />
                ))}
                {/*<MyFormControlLabel value="active" label="Active" control={<Radio />} />
                <MyFormControlLabel value="hold" label="Hold" control={<Radio />} />*/}
              </RadioGroup>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="number" name="soareceviedAmount" value={customerDetails.soareceviedAmount}
                onChange={handleInputChange} label="Amount Received for SOA" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2} fullWidth>
              <InputLabel sx={{lineHeight: '2.4375em'}}>Upload File</InputLabel>
              <MDInput type="file" name="uploadFile"
                onChange={handleFileChange} label="Upload File" variant="standard" />
              <MDButton variant="gradient" color="info" onClick={handleFileUpload}>
                Upload
              </MDButton>
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

export default AddCustomer;
