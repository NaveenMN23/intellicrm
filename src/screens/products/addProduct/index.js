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


import {APIService} from "./../../../services/rootService";
import {EndPoints, RequestType} from "./../../../services/apiConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
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

export default function AddProduct(){

  const gridRef = useRef();

  const gridExistingRef = useRef();

  const [rowData, setRowData] = useState(initialValues);

  const notify = (message) => toast(message);

  let navigate = useNavigate();

  const filterParams = {
    comparator: (filterLocalDateAtMidnight, cellValue) => {
      const dateAsString = cellValue;
      const dateParts = dateAsString.split('/');
      const cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
      );

      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }

      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }

      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
    },
  };

  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'productId', field:'productid', minWidth: 150},
    {headerName: 'category', field:'category', minWidth: 150},
    {headerName: 'EQUSBrandName', field:'equsbrandname', minWidth: 200},
    {headerName: 'activeIngredient', field:'activeingredient', minWidth: 200},
    {headerName: 'nameOnPackage', field:'nameonpackage', minWidth: 200},
    {headerName: 'strength', field:'strength', minWidth: 150},
    {headerName: 'dosageForm', field:'dosageform', minWidth: 180},
    {headerName: 'unitsPerPack', field:'unitsperpack', minWidth: 180},
    {headerName: 'productSourcedFrom', field:'productsourcedfrom', minWidth: 250},
    {headerName: 'manufacturer', field:'manufacturer', minWidth: 180},
    {headerName: 'licenceHolder', field:'licenceholder', minWidth: 180},
    {headerName: 'batch', field:'batch', minWidth: 100},
    {headerName: 'expiryDateRange', field:'expirydaterange', minWidth: 220, filter: 'agDateColumnFilter', filterParams: filterParams},
    {headerName: 'cifPricePerPack', field:'cifpriceperpack', minWidth: 220},
    {headerName: 'sellingPricePerPack', field:'sellingpriceperpack', minWidth: 250},
    {headerName: 'weight', field:'weight', minWidth: 120},
    {headerName: 'boe', field:'boe', minWidth: 100},
    {headerName: 'RXWarningCautionaryNote', field:'rxwarningcautionarynote', minWidth: 270},
    {headerName: 'qty', field:'qty', minWidth: 100},
  ]);


  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    editable: true,
    flex: 1,
    resizable: true,
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
    // params.api.resetRowHeights();
    params.api.sizeColumnsToFit();
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
      add: [{ productid:'',category:'',equsbrandname:'',activeingredient:'',nameonpackage:'',
        strength:'',dosageform:'',unitsperpack:'',productsourcedfrom:'',manufacturer:'',
        licenceholder:'',batch:'',expirydaterange:'',cifpriceperpack:'',sellingpriceperpack:'',
        weight:'',boe:'',rxwarningcautionarynote:'', qty:''}],
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
        //   unitsperpack:'',
        //   dosageForm:'',
        //   strength:'',
        //   quantity:''
        // }
        for(const el of resp.rows){
          if(el[0] && el[0].toString().toLowerCase().replace(/\s/g,'') !== "productid"){
            tempUpdate.push({"productid":el[0],"category":el[1],"equsbrandname":el[2],
              "activeingredient":el[3],"nameonpackage":el[4],"strength":el[5],"dosageform":el[6],
              "unitsperpack":el[7],"productsourcedfrom":el[8],"manufacturer":el[9],"licenceholder":el[10],
              "batch":el[11],"expirydaterange":el[12],"cifpriceperpack":el[13],
              "sellingpriceperpack":el[14],"weight":el[15],"boe":el[16],"rxwarningcautionarynote":el[17], "qty":el[18]});
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

  // const onBtnExportDataAsExcel = useCallback(() => {
  //   console.log(gridExistingRef.current.api);
  //   gridExistingRef.current.api.exportDataAsCsv();
  // }, []);

  const saveProducts = async () => {
    setRowData({
      ...rowData,
      "newRowData": tempUpdate
    });

    const resp = await APIService(EndPoints.ADD_PRODUCT_DETAILS, RequestType.PostJson,tempUpdate);

    if(resp.status == 200)
    {
      notify("Products details are saved");
      setTimeout(() => {
        navigate('/edit-product')
      }, 2000)
    }

  }

  // useEffect(() => {
  //   // getProductDetails();
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
                    Add Products
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
                      pagination={true}
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
    </DashboardLayout>
  )
}
