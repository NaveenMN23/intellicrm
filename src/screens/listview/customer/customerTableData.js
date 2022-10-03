// Material Dashboard 2 React components
import MDBox from "./../../../components/MDBox";
import MDButton from "./../../../components/MDButton";
import MDTypography from "./../../../components/MDTypography";
import MDAvatar from "./../../../components/MDAvatar";
import MDBadge from "./../../../components/MDBadge";

import React, { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import {APIService} from "./../../../services/rootService";
import {EndPoints, RequestType} from "./../../../services/apiConfig";

const initialValues = [{
  userId:0,
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  canEditCustomer: true,
  canEditProducts: true,
  canEditOrders: true,
}]

export default function Data() {

  const [customerDetails, setCustomerDetails] = useState([]);


  useEffect(() => {
      console.log("came here");
      fetchAllCustomerDetails();

  },[])

  const fetchAllCustomerDetails = async () => {

    const resp = await APIService(EndPoints.GET_ALL_CUSTOMER_DETAILS , RequestType.GET);

    if(resp.status == 200)
    {
      setCustomerDetails(resp.data);
    }

  }

const editCustomerData = (email) => {
  console.log(email);
  navigate(`/add-customer`, { state: email });
}

const deleteCustomer = async (email) => {
  console.log(email);
  const resp = await APIService(EndPoints.DELETE_CUSTOMER+email , RequestType.GET);
  if(resp.status == 200)
  {
    fetchAllCustomerDetails();
  }
}


  // Navigate module
  let navigate = useNavigate();

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  let columns;

  let userDetails = JSON.parse(localStorage.getItem("userDetails"));

  if(userDetails.role !== 'subadmin'){
    columns = [
      { Header: "Name", accessor: "author", width: "45%", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      // { Header: "Type", accessor: "employed", align: "center" },
      { Header: "Edit", accessor: "edit", align: "center" },
      { Header: "Delete", accessor: "delete", align: "center" },
    ];
  } else {
    columns = [
      { Header: "Name", accessor: "author", width: "45%", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
    ];
  }

  let rows = [];

  customerDetails && customerDetails?.map((customer) => {
    if(userDetails.role !== 'subadmin'){
      rows.push(
        {author: <Author image={customer.image} name={customer.firstName} email={customer.email} />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={customer.accountStatus}
            color={customer.accountStatus === "Active" ? "success" : "Hold"} variant="gradient" size="sm" />
          </MDBox>
        ),
        edit: (
          <MDButton variant="gradient" color="info" onClick={() => {editCustomerData(customer.email)}}>
            Edit
          </MDButton>
        ),
        delete: (
          <MDButton variant="gradient" color="info" onClick={() => {deleteCustomer(customer.email)}}>
            Delete
          </MDButton>
        ),}
      )
    }
    else {
      rows.push(
        {author: <Author image={customer.image} name={customer.firstName} email={customer.email} />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={customer.accountStatus}
            color={customer.accountStatus === "Active" ? "success" : "Hold"} variant="gradient" size="sm" />
          </MDBox>
        ),}
      )
    }
    });

  return {
    columns,
    rows
  }

}
