// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "./../../components/MDBox";
import MDButton from "./../../components/MDButton";
import MDTypography from "./../../components/MDTypography";
import MDInput from "./../../components/MDInput";
import { InputLabel } from '@mui/material';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ExcelRenderer, OutTable } from "react-excel-renderer";

// import { AgGridReact as AgGridReactType } from 'ag-grid-react/lib/agGridReact';

import DashboardLayout from "./../../components/DashboardLayout";
import DashboardNavbar from "./../../components/DashboardNavbar";

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';

const initialValues = {
  dataLoaded: false,
  oldRowData: [],
  newRowData: [],
  fileUpload: {
    uploadedFileName: "",
    isFormInvalid: false
  }
}

const convertToRem = (pxValue) => pxValue / 16;

const tempUpdate = [];

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const OnHold = () => {
  return(
    <div>onhold</div>
  )
}

const InProcess = () => {
  return(
    <div>inprocess</div>
  )
}

const Completed = () => {
  return(
    <div>completed
    hi
    dsds
    ds
    ds
    sd
    ds
    ds
    sd
    ds</div>
  )
}

const Orders = () => {

  const [selectedNav, setSelectedNav] = useState(0);

  const gridRef = useRef();

  const gridExistingRef = useRef();

  const [rowData, setRowData] = useState(initialValues);

  const [columnDefs, setColumnDefs] = useState([
    {field: 'Customer ID'},
    {field: 'Order ID'},
    {field: 'Order Name'},
    {field: 'Order Status'}
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    editable: true,
    flex: 1,
  }), []);

  const defaultReadonlyColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    editable: false,
    flex: 1,
  }), []);

  const cellClickedListener = useCallback( e=> {
    console.log(e);
  });

  //ag-Grid hook ready
  const onGridReady = params => {

    params.api.resetRowHeights();
    // gridRef.current = params.api;
    // console.log(params);
  };

  const getRecentIndex = () => {
    return 1;
  }

  //ag-Grid add new row functions
  const onAddRow = useCallback((addIndex) => {
    console.log(gridRef.current.api);
    const res = gridRef.current.api.applyTransaction({
      add: [{ customerId: '', orderId: '', orderName: '', orderStatus: null }],
      addIndex: addIndex
      });
      console.log(res);
  },[]);

  const onBulkUpdate = event => {
    if (event.target.files.length) {
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;
      console.log(fileObj);
      //check for file extension and pass only if it is .xlsx and display error message otherwise
      if (fileName.slice(fileName.lastIndexOf(".") + 1) === "xlsx") {
        setRowData({
          ...rowData,
          "fileUpload":{
            "uploadedFileName": fileName,
            "isFormInvalid": false
          }
        });
        renderFile(fileObj);
      } else {
        setRowData({
          ...rowData,
          "fileUpload":{
            "uploadedFileName": "",
            "isFormInvalid": true
          }
        });
      }
    }
  };

  //import Exel to table
  const renderFile = fileObj => {
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Rows uploaded:" + resp.rows);
        for(const el of resp.rows){
          if(el[0].toString().toLowerCase().replace(/\s/g,'') !== "customerid"){
            tempUpdate.push({"customerId": el[0], "orderId": el[1], "orderName": el[2], "status": el[3]});
            console.log("Rows uploaded:" + tempUpdate);
          }
        }
        setRowData({
          ...rowData,
          "dataLoaded": true,
          "newRowData": tempUpdate,
        });
      }
      console.log(rowData);
    });
  };

  const getOrderDetails = async () => {
    //const resp = await APIService(EndPoints.SAVE_CUSTOMER_DETAILS, RequestType.POST, formData);
    if(true){
      // notify("Customer details saved or updated successfully");
      // setTimeout(() => {
      //   navigate('/customerlist')
      // }, 2000);
      const data = [
        {customerId: '1', orderId: '1234', orderName:'Test Order 1', status:0},
        {customerId: '2', orderId: '2222', orderName:'Test Order 2', status:1},
        {customerId: '3', orderId: '3333', orderName:'Test Order 3', status:2},
        {customerId: '4', orderId: '4444', orderName:'Test Order 4', status:3},
      ];
      setRowData({
        ...rowData,
        "dataLoaded": true,
        "oldRowData": data
      });
    } else {
       // notify("An error occured");
    }
  }

  const getOrderDetailsByStatus = async (status) => {
    //const resp = await APIService(EndPoints.SAVE_CUSTOMER_DETAILS, RequestType.POST, formData);
    if(true){
      // notify("Customer details saved or updated successfully");
      // setTimeout(() => {
      //   navigate('/customerlist')
      // }, 2000);
      const data = [
        {customerId: '1', orderId: '1234', orderName:'Test Order 1', status:0},
        {customerId: '2', orderId: '2222', orderName:'Test Order 2', status:1},
        {customerId: '3', orderId: '3333', orderName:'Test Order 3', status:2},
        {customerId: '4', orderId: '4444', orderName:'Test Order 4', status:3},
      ];
      const filterData = data.filter(el => el.status === status);
      setRowData({
        ...rowData,
        "dataLoaded": true,
        "oldRowData": filterData
      });
    } else {
       // notify("An error occured");
    }
  }

  const All = () => {
    return(
      <MDBox pt={3} className='ag-theme-alpine'
        style={{fontSize: '14px', height: '400px', width: '100%'}}>
        <AgGridReact
          ref={gridExistingRef}
          onCellClicked = {cellClickedListener}
          onGridReady={onGridReady}
          rowData = {rowData.oldRowData}
          columnDefs = {columnDefs}
          suppressExcelExport={true}
          animateRows = {true}
          defaultColDef = {defaultReadonlyColDef}
          style={{ fontSize: '15px', width: '100' }}/>
      </MDBox>
    )
  }

  const handleChange = (event, newValue) => {
    setSelectedNav(newValue);
    SelectedTab(newValue);
  }

  const SelectedTab = () => {
    switch (selectedNav) {
      case 0:
        return <All/>;
        break;
      case 1:
        return <OnHold/>;
        break;
      case 2:
        return <InProcess/>;
        break;
      case 3:
        return <Completed/>;
        break;
      default:
        return <All/>;
        break;
    }
  }

  useEffect(() => {
    if(selectedNav === 0)
      getOrderDetails();
    else
      getOrderDetailsByStatus();
  },[selectedNav]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <MDBox pt={6} pb={3} sx={{display:"flex", alignItems:"center",
              flexFlow:"column"}}>
          <Grid container spacing={6} sx={{width:'90%'}}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Orders
                  </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3} sx={{ width: "100%" }}>
                  <Tabs value={selectedNav} onChange={handleChange} aria-label="nav tabs example">
                    <LinkTab label="All Orders" />
                    <LinkTab label="Orders on hold" />
                    <LinkTab label="Orders in process" />
                    <LinkTab label="Orders completed" />
                  </Tabs>
                  <MDBox pt={2} pb={2} px={2}>
                    <SelectedTab/>
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
    </DashboardLayout>
  )
}


export default Orders;