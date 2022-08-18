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

const ExistingOrder = (props) => {
  const {gridExistingRef, cellClickedListener, onGridReady, rowData, columnDefs, defaultReadonlyColDef} = props;
  return(
    <MDBox pt={3} className='ag-theme-alpine'
      style={{fontSize: '14px', height: '400px', width: '100%'}}>
      <AgGridReact
        ref={gridExistingRef}
        onCellClicked = {cellClickedListener}
        onGridReady={onGridReady}
        rowData = {rowData}
        columnDefs = {columnDefs}
        suppressExcelExport={true}
        animateRows = {true}
        defaultColDef = {defaultReadonlyColDef}
        style={{ fontSize: '15px', width: '100' }}/>
    </MDBox>
  )
}

const NewOrder = (props) => {
    const {gridRef, cellClickedListener, onGridReady, rowData,
      columnDefs, defaultColDef, onCellValueChanged} = props;
    return(
      <MDBox pt={3} className='ag-theme-alpine'
        style={{fontSize: '14px', height: '400px', width: '100%'}}>
        <AgGridReact
          ref={gridRef}
          onCellClicked = {cellClickedListener}
          onGridReady={onGridReady}
          rowData = {rowData}
          columnDefs = {columnDefs}
          animateRows = {true}
          defaultColDef = {defaultColDef}
          onCellValueChanged = {onCellValueChanged}
          style={{ fontSize: '15px', width: '100%' }}/>
      </MDBox>
  )
}

const Orders = () => {

  const [selectedNav, setSelectedNav] = useState(0);

  const gridRef = useRef();

  const gridExistingRef = useRef();

  const [rowData, setRowData] = useState(initialValues);

  const [columnDefs, setColumnDefs] = useState([
    {field: 'customerId'},
    {field: 'orderId'},
    {field: 'orderName'},
    {field: 'status'}
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
      add: [{ customerId: '', orderId: '', orderName: '', status: '' }],
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
          if(el[0] && el[0].toString().toLowerCase().replace(/\s/g,'') !== "customerid"){
            tempUpdate.push({"customerId": el[0], "orderId": el[1], "orderName": el[2], "status": el[3]});
            console.log("Rows uploaded:" + el);
          }
        }
        setRowData({
          ...rowData,
          "dataLoaded": true,
          "newRowData": tempUpdate,
        });
      }

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
        {customerId: '1', orderId: '1234', orderName:'Test Order 1', status:'Submitted'},
        {customerId: '2', orderId: '2222', orderName:'Test Order 2', status:'In Process'},
        {customerId: '3', orderId: '3333', orderName:'Test Order 3', status:'On Hold'},
        {customerId: '4', orderId: '4444', orderName:'Test Order 4', status:'Completed'},
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
        {customerId: '1', orderId: '1234', orderName:'Test Order 1', status:'Submitted'},
        {customerId: '2', orderId: '2222', orderName:'Test Order 2', status:'In Process'},
        {customerId: '3', orderId: '3333', orderName:'Test Order 3', status:'On Hold'},
        {customerId: '4', orderId: '4444', orderName:'Test Order 4', status:'Completed'},
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

  const onCellValueChanged = useCallback((event) => {
    console.log('Data after change is', event);
    // if(event.data)
    //api to save data

    console.log(event.data);
    if(tempUpdate[event.rowIndex]){
      tempUpdate[event.rowIndex] = event.data;
    } else {
      tempUpdate.push(event.data);
    }


  }, []);

  const saveOrders = () => {
    // setRowData({
    //   ...rowData,
    //   "newRowData": tempUpdate
    // });
    // setNewData(tempUpdate);
    console.log(tempUpdate);
  }

  const handleChange = (event, newValue) => {
    setSelectedNav(newValue);
    SelectedTab(newValue);
  }

  const SelectedTab = (newValue) => {
    switch (newValue) {
      case 0:
        getOrderDetails();
        break;
      case 1:
        getOrderDetailsByStatus('In Process');
        break;
      case 2:
        getOrderDetailsByStatus('On Hold');
        break;
      case 3:
        getOrderDetailsByStatus('Completed');
        break;
      default:
        getOrderDetails();
        break;
    }
  }

  useEffect(() => {
    getOrderDetails();
  },[]);

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
                    Add Orders
                  </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3} sx={{ width: "100%" }}>
                  <MDBox mt={4} mb={1} className='buttonSpaceEvenly'>
                    <InputLabel sx={{lineHeight: '3em', fontSize:'15px', color:"#000"}}>Bulk Upload
                      &nbsp;&nbsp;&nbsp;
                      <MDInput type="file" name="uploadFile"
                        onChange={onBulkUpdate}
                        onClick={event => {event.target.value = null; }}
                        />
                    </InputLabel>
                  </MDBox>
                  <MDBox>
                    <NewOrder gridRef={gridRef}
                    cellClickedListener = {cellClickedListener}
                    onGridReady={onGridReady} rowData = {rowData.newRowData}
                    columnDefs = {columnDefs} defaultColDef = {defaultColDef}
                    onCellValueChanged={onCellValueChanged}/>
                  </MDBox>
                  <MDBox mt={4} mb={1} className='buttonRight'>
                    <MDButton variant="gradient" color="info" onClick={saveOrders}>
                      Submit
                    </MDButton>
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
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
                    <LinkTab label="Orders In Process" />
                    <LinkTab label="Orders On Hold" />
                    <LinkTab label="Orders Completed" />
                  </Tabs>
                  <MDBox>
                    {rowData?.oldRowData && <ExistingOrder gridExistingRef={gridExistingRef} cellClickedListener={cellClickedListener}
                    onGridReady={onGridReady} rowData = {rowData.oldRowData} columnDefs = {columnDefs} defaultReadonlyColDef = {defaultReadonlyColDef}/>}
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
