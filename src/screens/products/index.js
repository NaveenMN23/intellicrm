// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "./../../components/MDBox";
import MDButton from "./../../components/MDButton";
import MDTypography from "./../../components/MDTypography";
import MDInput from "./../../components/MDInput";
import { InputLabel } from '@mui/material';

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ExcelRenderer, OutTable } from "react-excel-renderer";

// import { AgGridReact as AgGridReactType } from 'ag-grid-react/lib/agGridReact';

import DashboardLayout from "./../../components/DashboardLayout";
import DashboardNavbar from "./../../components/DashboardNavbar";

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';

import './styles.css';

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

export default function Product(){

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
    {field: 'qtyPerPack', minWidth: 95},
    {field: 'dosageForm', minWidth: 180},
    {field: 'strength', minWidth: 180},
    {field: 'quantity', minWidth: 90}
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
      add: [{ productId: '', category: '', brandName:'', api:'', otherName:'',
        countryOfOrigin:'', manufacturer:'', dosage:'', qtyPerPack:'', dosageForm:'',
        strength:'', quantity:''}],
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
        // const obj = {
        //   productId: '',
        //   category: '',
        //   brandName:'',
        //   api:'',
        //   otherName:'',
        //   countryOfOrigin:'',
        //   manufacturer:'',
        //   dosage:'',
        //   qtyPerPack:'',
        //   dosageForm:'',
        //   strength:'',
        //   quantity:''
        // }
        for(const el of resp.rows){
          if(el[0] && el[0].toString().toLowerCase().replace(/\s/g,'') !== "productid"){
            tempUpdate.push({"productId": el[0], "category": el[1], "brandName":el[2],
              "api":el[3], "otherName":el[4], "countryOfOrigin":el[5], "manufacturer":el[6],
              "dosage":el[7], "qtyPerPack":el[8], "dosageForm":el[9],
              "strength":el[10], "quantity":el[11]});
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
      const data = [
        {productId: '1', category: 'item', brandName:'test', api:'123', otherName:'New',
        countryOfOrigin:'IND', manufacturer:'Friek', dosage:'1', qtyPerPack:'12', dosageForm:'New',
        strength:'120%', quantity:'3'},
        {productId: '2', category: 'cat', brandName:'temp', api:'145', otherName:'Current',
        countryOfOrigin:'USA', manufacturer:'Ford', dosage:'2', qtyPerPack:'3', dosageForm:'Two',
        strength:'100%', quantity:'2'},
        {productId: '3', category: 'glory', brandName:'it', api:'178', otherName:'Recent',
        countryOfOrigin:'AUS', manufacturer:'Fiat', dosage:'1', qtyPerPack:'22', dosageForm:'',
        strength:'150%', quantity:'5'},
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

  useEffect(() => {
    getProductDetails();
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
                    Products
                  </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                  <MDBox mt={4} mb={1} className='buttonSpaceEvenly'>
                    <MDButton variant="gradient" color="info" onClick={onAddRow}>
                      + Add Product
                    </MDButton>

                    {/*<MDBox>{rowData.fileUpload.uploadedFileName}</MDBox>

                    <input
                      type="file"
                      onChange={this.fileHandler}
                      ref={this.fileInput}
                      onClick={event => {
                        event.target.value = null;
                      }}let sizeValue = pxToRem(38);
                      style={{ padding: "10px" }}
                      <InputLabel sx={{lineHeight: '2.4375em'}}>Bulk Update</InputLabel>
                    />
                    <MDButton variant="gradient" color="info" style={{"width":convertToRem(2000)}}>
                      Upload
                      <MDInput type="file" name="uploadFile"
                        onChange={onBulkUpdate}
                        onClick={event => {event.target.value = null; }}
                        label="Bulk Update"  style={{"opacity": "0"}} />
                    </MDButton>*/}
                    <InputLabel sx={{lineHeight: '3em', fontSize:'15px', color:"#000"}}>Bulk Upload
                      &nbsp;&nbsp;&nbsp;
                      <MDInput type="file" name="uploadFile"
                        onChange={onBulkUpdate}
                        onClick={event => {event.target.value = null; }}
                        />
                    </InputLabel>
                  </MDBox>
                  <MDBox pt={3} className='ag-theme-alpine'
                    style={{fontSize: '14px', height: '400px', width: '100%'}}>
                    <AgGridReact
                      ref={gridRef}
                      onCellClicked = {cellClickedListener}
                      onGridReady={onGridReady}
                      rowData = {rowData.newRowData}
                      columnDefs = {columnDefs}
                      animateRows = {true}
                      defaultColDef = {defaultColDef}
                      onCellValueChanged={onCellValueChanged}
                      style={{ fontSize: '15px', width: '100%' }}/>
                  </MDBox>
                  <MDBox mt={4} mb={1} className='buttonRight'>
                    <MDButton variant="gradient" color="info" onClick={() => {saveProducts()}}>
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
                    View Products
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
                      defaultColDef = {defaultReadonlyColDef}
                      style={{ fontSize: '15px', width: '100' }}/>
                  </MDBox>
                  <MDBox mt={4} mb={1} className='buttonRight'>
                    <MDButton variant="gradient" color="info" onClick={() => {onBtnExportDataAsExcel()}}>
                      Export
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
