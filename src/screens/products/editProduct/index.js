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
    {field: 'productId', minWidth: 150},
    {field: 'category', minWidth: 150},
    {field: 'EQUSBrandName', minWidth: 200},
    {field: 'activeIngredient', minWidth: 200},
    {field: 'nameOnPackage', minWidth: 200},
    {field: 'strength', minWidth: 150},
    {field: 'dosageForm', minWidth: 180},
    {field: 'unitsPerPack', minWidth: 180},
    {field: 'productSourcedFrom', minWidth: 250},
    {field: 'manufacturer', minWidth: 180},
    {field: 'licenceHolder', minWidth: 180},
    {field: 'batch', minWidth: 100},
    {field: 'expiryDateRange', minWidth: 220, filter: 'agDateColumnFilter', filterParams: filterParams},
    {field: 'cifPricePerPack', minWidth: 220},
    {field: 'sellingPricePerPack', minWidth: 250},
    {field: 'weight', minWidth: 120},
    {field: 'boe', minWidth: 100},
    {field: 'RXWarningCautionaryNote', minWidth: 270},
    {field: 'qty', minWidth: 100},
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
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
    getProductDetails();
    // gridRef.current = params.api;
    // console.log(params);
  };

  const getRecentIndex = () => {
    return 1;
  }

  const mappingColumn = {
    'productId':'',
    'category':'',
    'EQUSBrandName':'',
    'activeIngredient':'',
    'nameOnPackage':'',
    'strength':'',
    'dosageForm':'',
    'unitsPerPack':'',
    'productSourcedFrom':'',
    'manufacturer':'',
    'licenceHolder':'',
    'batch':'',
    'expiryDateRange':'',
    'cifPricePerPack':'',
    'sellingPricePerPack':'',
    'weight':'',
    'boe':'',
    'RXWarningCautionaryNote':'',
    'qty':''
  }

  const getProductDetails = async () => {
    const resp = await APIService(EndPoints.GET_ALL_PRODUCT_DETAILS, RequestType.GET);
    if(resp.status == 200){
      // notify("Customer details saved or updated successfully");
      // setTimeout(() => {
      //   navigate('/customerlist')
      // }, 2000);
      const data =resp.data;

      mappingColumn['productId'] = data['productid'];
      mappingColumn['category'] = data['category'];
      mappingColumn['EQUSBrandName'] = data['equsbrandname'];
      mappingColumn['activeIngredient'] = data['activeingredient'];
      mappingColumn['nameOnPackage'] = data['nameonpackage'];
      mappingColumn['strength'] = data['strength'];
      mappingColumn['dosageForm'] = data['dosageform'];
      mappingColumn['unitsPerPack'] = data['unitsperpack'];
      mappingColumn['productSourcedFrom'] = data['productsourcedfrom'];
      mappingColumn['manufacturer'] = data['manufacturer'];
      mappingColumn['licenceHolder'] = data['licenceholder'];
      mappingColumn['batch'] = data['batch'];
      mappingColumn['expiryDateRange'] = data['expirydaterange'];
      mappingColumn['cifPricePerPack'] = data['cifpriceperpack'];
      mappingColumn['sellingPricePerPack'] = data['sellingpriceperpack'];
      mappingColumn['weight'] = data['weight'];
      mappingColumn['boe'] = data['boe'];
      mappingColumn['RXWarningCautionaryNote'] = data['rxwarningcautionarynote'];
      mappingColumn['qty'] = data['qty'];

      setRowData({
        ...rowData,
        "dataLoaded": true,
        "oldRowData": mappingColumn
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
