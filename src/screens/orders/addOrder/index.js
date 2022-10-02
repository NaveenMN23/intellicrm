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

const NewOrder = (props) => {
    const {gridRef, onGridReady, rowData,
      columnDefs, defaultColDef, onCellValueChanged} = props;
    return(
      <MDBox pt={3} className='ag-theme-alpine'
        style={{fontSize: '14px', height: '400px', width: '100%'}}>
        <AgGridReact
          ref={gridRef}
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

const AddOrder = () => {

  const gridRef = useRef();

  const gridExistingRef = useRef();

  const [rowData, setRowData] = useState(initialValues);

  const [getSelectedRows, setSelectedRows] = useState([]);

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
    {headerName: 'Date', field:'date', minWidth: 100, filter: 'agDateColumnFilter', filterParams: filterParams},
    {headerName: 'Reference Number', field:'referencenumber', minWidth: 200},
    {headerName: 'Online Pharmacy', field:'onlinepharmacy', minWidth: 200},
    {headerName: 'Online Pharmacy Phone Number', field:'onlinepharmacyphonenumber', minWidth: 300},
    {headerName: 'Order Number', field:'ordernumber', minWidth: 180},
    {headerName: 'Customer Name', field:'customername', minWidth: 180},
    {headerName: 'Customer Phone Number', field:'customerphonenumber', minWidth: 280},
    {headerName: 'Email Address', field:'emailaddress', minWidth: 180},
    {headerName: 'Address 1', field:'address1', minWidth: 150},
    {headerName: 'Address 2', field:'address2', minWidth: 150},
    {headerName: 'City', field:'city', minWidth: 100},
    {headerName: 'Province', field:'province', minWidth: 150},
    {headerName: 'Zip Code', field:'zipCode', minWidth: 150},
    {headerName: 'Prescriber Name', field:'prescribername', minWidth: 180},
    {headerName: 'Product ID', field:'productid', minWidth: 150},
    {headerName: 'EQUS Brand Name', field:'equsbrandname', minWidth: 200},
    {headerName: 'Category', field:'category', minWidth: 150},
    {headerName: 'Name On Package', field:'nameonpackage', minWidth: 200},
    {headerName: 'Strength', field:'strength', minWidth: 150},
    {headerName: 'Units Per Pack', field:'unitsperpack', minWidth: 180},
    {headerName: 'Dosage Form', field:'dosageform', minWidth: 180},
    {headerName: 'Active Ingredients', field:'activeingredients', minWidth: 250},
    {headerName: 'Product Sourced From', field:'productsourcedfrom', minWidth: 280},
    {headerName: 'Total Packs Ordered', field:'totalpacksordered', minWidth: 280},
    {headerName: 'Total Price Customer Pays', field:'totalpricecustomerpays', minWidth: 300},
    {headerName: 'Price Per Pack Client Pays', field:'priceperpackclientpays', minWidth: 300},
    {headerName: 'Shipping Cost Per Order', field:'shippingcostperorder', minWidth: 280},
    {headerName: 'Total Price Client Pays', field:'totalpriceclientpays', minWidth: 280},
    {headerName: 'Prescription Attached', field:'prescriptionattached', minWidth: 280},
    {headerName: 'Directions Of Use', field:'directionsofuse', minWidth: 200},
    {headerName: 'RxWarning/ Cautionary Note', field:'rxWarningcautionarynote', minWidth: 300},
    {headerName: 'Remarks', field:'remarks', minWidth: 150},
    {headerName: 'Quantity', field:'quantity', minWidth: 150},
    {headerName: 'Refill', field:'refill', minWidth: 150},
    {headerName: 'Doctor Name', field:'doctorname', minWidth: 180},
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    editable: true,
    flex: 1,
  }), []);

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

  //ag-Grid add new row functions
  const onAddRow = useCallback((addIndex) => {
    console.log(gridRef.current.api);
    const res = gridRef.current.api.applyTransaction({
      add: [{ date:'', referenceNumber:'', onlinePharmacy:'', onlinePharmacyPhoneNumber:'', orderNumber:'',
      customerName:'', customerPhoneNumber:'', emailAddress:'', address1:'', address2:'', city:'',
      province:'', zipCode:'', prescriberName:'', productID:'', EQUSBrandName:'', category:'',
      nameOnPackage:'', strength:'', unitsPerPack :'', dosageForm:'', activeIngredients:'',
      productSourcedFrom:'', totalPacksOrdered:'', totalPriceCustomerPays:'', pricePerPackClientPays:'',
      shippingCostPerOrder:'', totalPriceClientPays:'', prescriptionAttached:'', directionsOfUse:'',
      rxWarningCautionaryNote:'', remarks:'', quantity:'',  refill:'', doctorName:''}],
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
            tempUpdate.push({"date": el[0], "referenceNumber": el[1], "onlinePharmacy": el[2], "onlinePharmacyPhoneNumber": el[3], "orderNumber": el[4],
            "customerName": el[5], "customerPhoneNumber": el[6], "emailAddress": el[7], "address1": el[8], "address2": el[9], "city": el[10],
            "province": el[11], "zipCode": el[12], "prescriberName": el[13], "productID": el[14], "EQUSBrandName": el[15], "category": el[16],
            "nameOnPackage": el[17], "strength": el[18], "unitsPerPack ": el[19], "dosageForm": el[20], "activeIngredients": el[21],
            "productSourcedFrom": el[22], "totalPacksOrdered": el[23], "totalPriceCustomerPays": el[24], "pricePerPackClientPays": el[25],
            "shippingCostPerOrder": el[26], "totalPriceClientPays": el[27], "prescriptionAttached": el[28], "directionsOfUse": el[29],
            "rxWarningCautionaryNote": el[30], "remarks": el[31], "quantity": el[32], "refill": el[33], "doctorName": el[34]});
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
                <MDBox pt={4} pb={3} px={3} sx={{ width: "100%"}}>
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
    </DashboardLayout>
  )
}


export default AddOrder;
