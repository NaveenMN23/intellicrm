// Material Dashboard 2 React components
import MDBox from "./../../../components/MDBox";
import MDButton from "./../../../components/MDButton";
import MDTypography from "./../../../components/MDTypography";
import MDAvatar from "./../../../components/MDAvatar";
import MDBadge from "./../../../components/MDBadge";

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';


import {APIService} from "./../../../services/rootService";
import {EndPoints, RequestType} from "./../../../services/apiConfig";

let userDetails = JSON.parse(localStorage.getItem("userDetails"));

export default function SubAdminData() {

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

  if(userDetails.role === 'subadmin' && !userDetails.canEditCustomer) {
    columns = [
      { Header: "Name", accessor: "author", width: "45%", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
    ];
  }
  else {
    columns = [
      { Header: "Name", accessor: "author", width: "45%", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      // { Header: "Type", accessor: "employed", align: "center" },
      { Header: "Edit", accessor: "edit", align: "center" },
      { Header: "Delete", accessor: "delete", align: "center" },
    ];
  }

  const [subAdminDetails, setsubAdminDetails] = useState([]);


  useEffect(() => {
      console.log("came here");
      fetchAllsubAdminDetails();

  },[])

  const fetchAllsubAdminDetails = async () => {

    const resp = await APIService(EndPoints.GET_ALL_SUBADMIN_DETAILS , RequestType.GET);

    if(resp.status == 200)
    {
      setsubAdminDetails(resp.data);
    }
  }

  const editSubAdmin = (email) => {
    console.log(email);
    navigate(`/add-subadmin`, { state: email });
  }

  const deleteSubAdmin = async (email) => {
    console.log(email);
    const resp = await APIService(EndPoints.DELETE_SUBADMIN+email , RequestType.GET);
    if(resp.status == 200)
    {
      fetchAllsubAdminDetails();
    }
  }

  let rows = [];

  subAdminDetails && subAdminDetails?.map((subadmin) => {
    if(userDetails.role === 'subadmin' && !userDetails.canEditCustomer) {
      rows.push(
        {author: <Author image={subadmin.image} name={subadmin.firstName} email={subadmin.email} />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={subadmin.accountStatus}
            color={subadmin.accountStatus === "Active" ? "success" : "Hold"} variant="gradient" size="sm" />
          </MDBox>
        ),}
      )
    } else {
      rows.push(
        {author: <Author image={subadmin.image} name={subadmin.firstName} email={subadmin.email} />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={subadmin.accountStatus}
            color={subadmin.accountStatus === "Active" ? "success" : "Hold"} variant="gradient" size="sm" />
          </MDBox>
        ),
        edit: (
          <MDButton variant="gradient" color="info" onClick={() => {editSubAdmin(subadmin.email)}}>
            Edit
          </MDButton>
        ),
        delete: (
          <MDButton variant="gradient" color="info" onClick={() => {deleteSubAdmin(subadmin.email)}}>
            Delete
          </MDButton>
        ),}
      )
    }
  });

  return {
    columns,
    rows
  }
}
