// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "./../../components/MDBox";
import MDButton from "./../../components/MDButton";
import MDTypography from "./../../components/MDTypography";

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
// import { AgGridReact as AgGridReactType } from 'ag-grid-react/lib/agGridReact';

import DashboardLayout from "./../../components/DashboardLayout";
import DashboardNavbar from "./../../components/DashboardNavbar";

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';

import './styles.css';

export default function Product(){

  const gridRef = useRef();

  const [rowData, setRowData] = useState([
    {productId: '1', productName: 'New'},
    {productId: '2', productName: 'Existing'},
    {productId: '3', productName: 'Latest'},
  ]);

  const [columnDefs, setColumnDefs] = useState([
    {field: 'productId'},
    {field: 'productName'},
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    editable: true,
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
      add: [{ productId: '', productName: '' }],
      addIndex: addIndex
      });
      console.log(res);
  },[]);

  // const updateItems = useCallback(() => {
  //   // update the first 2 items
  //   const itemsToUpdate = [];
  //   gridRef.current.api.forEachNodeAfterFilterAndSort(function (
  //     rowNode,
  //     index
  //   ) {
  //
  //     const data = rowNode.data;
  //     data.price = Math.floor(Math.random() * 20000 + 20000);
  //     itemsToUpdate.push(data);
  //   });
  //   const res = gridRef.current.api.applyTransaction({ update: itemsToUpdate });
  //   console.log(res);
  // }, []);

  const getProductDetails = async () => {
    //const resp = await APIService(EndPoints.SAVE_CUSTOMER_DETAILS, RequestType.POST, formData);
    if(true){
      // notify("Customer details saved or updated successfully");
      // setTimeout(() => {
      //   navigate('/customerlist')
      // }, 2000);
    } else {
       // notify("An error occured");
    }
  }

  const onCellValueChanged = useCallback((event) => {
    console.log('Data after change is', event.data);
    //api to save data
  }, []);

  useEffect(() => {
    getProductDetails();
  },[]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <MDBox pt={6} pb={3} sx={{display:"flex", alignItems:"center",
              flexFlow:"column"}}>
          <Grid container spacing={6} sx={{width:'80%'}}>
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
                    Products
                  </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" color="info" onClick={onAddRow}>
                      + Add Product
                    </MDButton>
                  </MDBox>
                  <MDBox pt={3} className='ag-theme-material'
                    style={{height:1000, fontSize: '14px'}}>
                    <AgGridReact
                      ref={gridRef}
                      onCellClicked = {cellClickedListener}
                      onGridReady={onGridReady}
                      rowData = {rowData}
                      columnDefs = {columnDefs}
                      animateRows = {true}
                      defaultColDef = {defaultColDef}
                      onCellValueChanged={onCellValueChanged}
                      style={{ fontSize: '15px' }}/>
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
    </DashboardLayout>
  )
}
