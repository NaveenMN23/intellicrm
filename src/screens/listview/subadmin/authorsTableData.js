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

  const columns = [
    { Header: "Name", accessor: "author", width: "45%", align: "left" },
    { Header: "Status", accessor: "status", align: "center" },
    // { Header: "Type", accessor: "employed", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

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

  const editSubAdmin = (subAdminId) => {
    console.log(subAdminId);
    navigate(`/add-subadmin`, { state: subAdminId });
  }

  let rows = [];

  subAdminDetails && subAdminDetails?.map((subadmin) => {
      rows.push(
        {author: <Author image={subadmin.image} name={subadmin.firstName} email={subadmin.email} />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={subadmin.accountStatus}
            color={subadmin.accountStatus === "Active" ? "success" : "Hold"} variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <MDButton variant="gradient" color="info" onClick={() => {editSubAdmin(subadmin.userId)}}>
            Edit
          </MDButton>
          // <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          //   Edit
          // </MDTypography>
        ),}
      )
    });

  return {
    columns,
    rows
  }
}
