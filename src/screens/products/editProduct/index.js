// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "./../../../components/MDBox";
import MDButton from "./../../../components/MDButton";
import MDTypography from "./../../../components/MDTypography";
import MDInput from "./../../../components/MDInput";
import { InputLabel } from '@mui/material';

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ExcelRenderer, OutTable } from "react-excel-renderer";

// import { AgGridReact as AgGridReactType } from 'ag-grid-react/lib/agGridReact';

import DashboardLayout from "./../../../components/DashboardLayout";
import DashboardNavbar from "./../../../components/DashboardNavbar";

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';

import './styles.css';
import {APIService} from "./../../../services/rootService";
import {EndPoints, RequestType} from "./../../../services/apiConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

export default function EditProduct(){

  const gridRef = useRef();

  const gridExistingRef = useRef();

  const [rowData, setRowData] = useState(initialValues);

  const [columnDefs, setColumnDefs] = useState([
    {field: 'productId', minWidth: 180},
    {field: 'category', minWidth: 180},
    {field: 'brandName', minWidth: 180},
    {field: 'api', minWidth: 180},
    {field: 'otherName', minWidth: 180},
    {field: 'countryOfOrigin', minWidth: 180},
    {field: 'manufacturer', minWidth: 180},
    {field: 'dosage', minWidth: 180},
    {field: 'qtyPerPack', minWidth: 150, editable: true},
    {field: 'dosageForm', minWidth: 180},
    {field: 'strength', minWidth: 180},
    {field: 'quantity', minWidth: 120, editable: true}
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    flex: 1,
  }), []);

  // const defaultReadonlyColDef = useMemo(() => ({
  //   sortable: true,
  //   filter: true,
  //   editable: false,
  //   flex: 1,
  // }), []);

  const cellClickedListener = useCallback( e=> {
    console.log(e);
  });

  //ag-Grid hook ready
  const onGridReady = params => {

    params.api.resetRowHeights();
    getProductDetails();
    // gridRef.current = params.api;
    // console.log(params);
  };

  const getRecentIndex = () => {
    return 1;
  }


  const getProductDetails = async () => {
    const resp = await APIService(EndPoints.GET_ALL_PRODUCT_DETAILS, RequestType.GET);
    if(resp.status == 200){
      // notify("Customer details saved or updated successfully");
      // setTimeout(() => {
      //   navigate('/customerlist')
      // }, 2000);
      const data =resp.data;

      setRowData({
        ...rowData,
        "dataLoaded": true,
        "oldRowData": data
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

  const onBtnExportDataAsExcel = useCallback(() => {
    console.log(gridExistingRef.current.api);
    gridExistingRef.current.api.exportDataAsCsv();
  }, []);

  const saveProducts = () => {
    setRowData({
      ...rowData,
      "newRowData": tempUpdate
    });
    console.log(tempUpdate);
  }

  // useEffect(() => {
  //
  // },[]);

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
                    Edit Products
                  </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
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
                      defaultColDef = {defaultColDef}
                      pagination={true}
                      onCellValueChanged={onCellValueChanged}
                      style={{ fontSize: '15px', width: '100' }}/>
                  </MDBox>
                  <MDBox mt={4} mb={1} className='buttonSpaceEvenly'>
                    <MDButton variant="gradient" color="info" onClick={() => {onBtnExportDataAsExcel()}}>
                      Export
                    </MDButton>
                    <MDButton variant="gradient" color="info" onClick={() => {saveProducts()}}>
                      Submit
                    </MDButton>
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
    </DashboardLayout>
  )
}
