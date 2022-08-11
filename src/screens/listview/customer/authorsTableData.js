/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "./../../../components/MDBox";
import MDButton from "./../../../components/MDButton";
import MDTypography from "./../../../components/MDTypography";
import MDAvatar from "./../../../components/MDAvatar";
import MDBadge from "./../../../components/MDBadge";

// Images
import team2 from "./../../../assets/images/team-2.jpg";
import team3 from "./../../../assets/images/team-3.jpg";
import team4 from "./../../../assets/images/team-4.jpg";

import { useNavigate } from "react-router-dom";

export default function Data() {

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

  let data =
    [{
      "id": 1,
      "name": "John Michael",
      "email":"john@creative-tim.com",
      "image": {team2},
      "accountStatus": "Active"
    },
    {
      "id": 2,
      "name": "Benley",
      "email":"benley@creative-tim.com",
      "image": {team3},
      "accountStatus": "Hold"
    },
    {
      "id": 3,
      "name": "Triad",
      "email":"triad@creative-tim.com",
      "image": {team4},
      "accountStatus": "Active"
    }];

  const editCustomerData = (customerId) => {
    console.log(customerId);
    navigate(`/add-customer`, { state: customerId });
  }

  let rows = [];

    data && data?.map((customer) => {
      rows.push(
        {author: <Author image={customer.image} name={customer.name} email={customer.email} />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={customer.accountStatus}
            color={customer.accountStatus === "Active" ? "success" : "Hold"} variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <MDButton variant="gradient" color="info" onClick={() => {editCustomerData(customer.id)}}>
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

  // let rows = [
  //   {
  //     author: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
  //     function: <Job title="Manager" description="Organization" />,
  //     status: (
  //       <MDBox ml={-1}>
  //         <MDBadge badgeContent="Active" color="success" variant="gradient" size="sm" />
  //       </MDBox>
  //     ),
  //     employed: (
  //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
  //         Customer
  //       </MDTypography>
  //     ),
  //     action: (
  //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
  //         Edit
  //       </MDTypography>
  //     ),
  //   },
  //   {
  //     author: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
  //     function: <Job title="Programator" description="Developer" />,
  //     status: (
  //       <MDBox ml={-1}>
  //         <MDBadge badgeContent="Hold" color="dark" variant="gradient" size="sm" />
  //       </MDBox>
  //     ),
  //     employed: (
  //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
  //         Customer
  //       </MDTypography>
  //     ),
  //     action: (
  //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
  //         Edit
  //       </MDTypography>
  //     ),
  //   },
  //   {
  //     author: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
  //     function: <Job title="Executive" description="Projects" />,
  //     status: (
  //       <MDBox ml={-1}>
  //         <MDBadge badgeContent="Active" color="success" variant="gradient" size="sm" />
  //       </MDBox>
  //     ),
  //     employed: (
  //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
  //         Sub-Admin
  //       </MDTypography>
  //     ),
  //     action: (
  //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
  //         Edit
  //       </MDTypography>
  //     ),
  //   }
  // ];
  //
  // return {
  //   columns, rows
  // };
}
