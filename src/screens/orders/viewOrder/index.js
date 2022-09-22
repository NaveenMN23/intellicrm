// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "./../../../components/MDBox";
import MDButton from "./../../../components/MDButton";
import MDTypography from "./../../../components/MDTypography";
import MDInput from "./../../../components/MDInput";
import { InputLabel } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import invoice from "./../../../Reports/Invoice";
import label from "./../../../Reports/Label";
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
// import { AgGridReact as AgGridReactType } from 'ag-grid-react/lib/agGridReact';
import { SvgIcon } from '@mui/material';
import DashboardLayout from "./../../../components/DashboardLayout";
import DashboardNavbar from "./../../../components/DashboardNavbar";
import './styles.css';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';

const initialValues = {
  dataLoaded: false,
  oldRowData: [],
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
  const {gridExistingRef, cellClickedListener, onGridReady, rowData, columnDefs, defaultReadonlyColDef, onRowSelected} = props;
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
        rowSelection={'multiple'}
        suppressRowClickSelection={true}
        onRowSelected={onRowSelected}
        style={{ fontSize: '15px', width: '100' }}/>
    </MDBox>
  )
}


const downloadBtn = () => {
  return (
    <span>
      <DownloadForOfflineOutlinedIcon sx={{width:'2em',height:'2em'}}></DownloadForOfflineOutlinedIcon>
    </span>
  );
}

const ViewOrder = () => {

  const [selectedNav, setSelectedNav] = useState(0);

  const gridExistingRef = useRef();

  const [rowData, setRowData] = useState(initialValues);

  const [getSelectedRows, setSelectedRows] = useState([]);

  const [printColumnDefs, setPrintColumnDefs] = useState([
    {field: 'customerId',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },
    {field: 'orderId'},
    {field: 'orderName'},
    {field: 'status'},
    {field: 'invoice', cellRenderer: downloadBtn}
  ]);

  const defaultReadonlyColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    editable: false,
    flex: 1,
  }), []);

  const cellClickedListener = useCallback( e=> {
    console.log(e);
    if(e.column.colId === 'invoice'){
      invoice(e.data);
    }
  });

  //ag-Grid hook ready
  const onGridReady = params => {

    params.api.resetRowHeights();
    // gridRef.current = params.api;
    // console.log(params);
  };

  // const isRowSelectable = useMemo(() => {
  //   return (params) => {
  //     console.log("paaramas", params);
  //     return !!params.data;
  //   };
  // }, []);

  // const selectedRows = [];

  const exportLabel = () => {
    let selectedRows = gridExistingRef.current.api.getSelectedRows();
    label(selectedRows);
  }

  const exportInvoice = () => {
    let selectedRows = gridExistingRef.current.api.getSelectedRows();
    invoice(selectedRows);
  }

  const onRowSelected = useCallback((event) => {
    // let selectedRows = gridExistingRef.current.api.getSelectedRows();
    // if(event.node.isSelected()){
    //   selectedRows.push(event.node.data);
    //   console.log(event.node.data);
    // } else {
    //
    // }
    // setSelectedRows();
    // console.log(
    //   'row ' +
    //     event.node.data +
    //     ' selected = ' +
    //     event.node.isSelected()
    // );
  }, []);


  const getRecentIndex = () => {
    return 1;
  }

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
                    View Order
                  </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3} sx={{ width: "100%"}}>
                  <MDBox mt={4} mb={1} className='buttonSpaceEvenly'>
                    <MDButton variant="gradient" color="info" onClick={exportInvoice}>
                      Export Invoice
                    </MDButton>
                    <MDButton variant="gradient" color="info" onClick={exportLabel}>
                      Export Label
                    </MDButton>
                  </MDBox>
                </MDBox>
                <MDBox pt={4} pb={3} px={3} sx={{ width: "100%", bgcolor: 'background.paper' }}>
                  <Tabs value={selectedNav} onChange={handleChange} aria-label="nav tabs example">
                    <LinkTab label="All Orders" />
                    <LinkTab label="Orders In Process" />
                    <LinkTab label="Orders On Hold" />
                    <LinkTab label="Orders Completed" />
                  </Tabs>
                  <MDBox px={1}>
                    {rowData?.oldRowData && <ExistingOrder gridExistingRef={gridExistingRef} cellClickedListener={cellClickedListener}
                    onGridReady={onGridReady} rowData = {rowData.oldRowData} columnDefs = {printColumnDefs} defaultReadonlyColDef = {defaultReadonlyColDef}
                    onRowSelected = {onRowSelected} />}
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
    </DashboardLayout>
  )
}


export default ViewOrder;
