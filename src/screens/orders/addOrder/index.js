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
import {APIService} from "./../../../services/rootService";
import {EndPoints, RequestType} from "./../../../services/apiConfig";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@mui/material/Modal';

const initialValues = {
  dataLoaded: false,
  newRowData: [],
  fileUpload: {
    uploadedFileName: "",
    isFormInvalid: false
  }
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

const ModalPopup = (props) => {
  const {open, handleClose, data} = props;

  return(
    <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <MDBox sx={style}>
          <MDTypography id="modal-modal-description" sx={{ mt: 2 }}>
            {data && data.map((el) => {
              return <li>{el}</li>
            })}
          </MDTypography>
        </MDBox>
      </Modal>
  )
}

const AddOrder = () => {

  const navigate = useNavigate();

  const notify = (message) => toast(message);

  const gridRef = useRef();

  const gridExistingRef = useRef();

  const [rowData, setRowData] = useState(initialValues);

  const [getSelectedRows, setSelectedRows] = useState([]);

  const [error, setError] = useState({open:false, message:''});

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
    {headerName: 'Date', field:'date', minWidth: 200, filter: 'agDateColumnFilter', filterParams: filterParams},
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
    {headerName: 'Country', field:'country', minWidth: 150},
    {headerName: 'Zip Code', field:'zipcode', minWidth: 150},
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
    {headerName: 'RxWarning/ Cautionary Note', field:'rxwarningcautionarynote', minWidth: 300},
    {headerName: 'Remarks', field:'remarks', minWidth: 150},
    {headerName: 'Quantity', field:'quantity', minWidth: 150},
    {headerName: 'Refill', field:'refill', minWidth: 150},
    {headerName: 'Doctor Name', field:'doctorname', minWidth: 180},
    {headerName: 'Online Pharmacy Name', field:'onlinepharmacyName', minWidth: 200},

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
      add: [{ date:'', referencenumber:'', onlinepharmacy:'', onlinepharmacyphonenumber:'', ordernumber:'',
      customername:'', customerphonenumber:'', emailaddress:'', address1:'', address2:'', city:'',
      province:'', country:'', zipcode:'', prescribername:'', productid:'', equsbrandname:'', category:'',
      nameonpackage:'', strength:'', unitsperpack :'', dosageform:'', activeingredients:'',
      productsourcedfrom:'', totalpacksordered:'', totalpricecustomerpays:'', priceperpackclientpays:'',
      shippingcostperorder:'', totalpriceclientpays:'', prescriptionattached:'', directionsofuse:'',
      rxwarningcautionarynote:'', remarks:'', quantity:'',  refill:'', doctorname:'',onlinepharmacyName:''}],
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
          if(el[0] && el[0].toString().toLowerCase().replace(/\s/g,'') !== "date"){
            tempUpdate.push({"date": (el[0] !== null && el[0]!== undefined) ? new Date(el[0]) : '', "referencenumber": (el[1] !== null && el[1]!== undefined) ? el[1].toString():'', "onlinepharmacy": (el[2] !== null && el[2]!== undefined) ? el[2].toString():'', "onlinepharmacyphonenumber": (el[3] !== null && el[3]!== undefined) ? el[3].toString():'', "ordernumber": (el[4] !== null && el[4]!== undefined) ? el[4].toString():'',
            "customername": (el[5] !== null && el[5]!== undefined) ? el[5].toString():'', "customerphonenumber": (el[6] !== null && el[6]!== undefined) ? el[6].toString():'', "emailaddress": (el[7] !== null && el[7]!== undefined) ? el[7].toString():'', "address1": (el[8] !== null && el[8]!== undefined) ? el[8].toString():'', "address2": (el[9] !== null && el[9]!== undefined) ? el[9].toString():'', "city": (el[10] !== null && el[10]!== undefined) ? el[10].toString():'',
            "province": (el[11] !== null && el[11]!== undefined) ? el[11].toString():'', "country": (el[12] !== null && el[12]!== undefined) ? el[12].toString():'', "zipcode": (el[13] !== null && el[13]!== undefined) ? el[13].toString():'', "prescribername": (el[14] !== null && el[14]!== undefined) ? el[14].toString():'', "productid": (el[15] !== null && el[15]!== undefined) ? el[15].toString():'', "equsbrandname": (el[16] !== null && el[16]!== undefined) ? el[16].toString():'',
            "category": (el[17] !== null && el[17]!== undefined) ? el[17].toString():'',
            "nameonpackage": (el[18] !== null && el[18]!== undefined) ? el[18].toString():'', "strength": (el[19] !== null && el[19]!== undefined) ? el[19].toString():'', "unitsperpack": (el[20] !== null && el[20]!== undefined) ? el[20].toString():'', "dosageform": (el[21] !== null && el[21]!== undefined) ? el[21].toString():'', "activeingredients": (el[22] !== null && el[22]!== undefined) ? el[22].toString():'',
            "productsourcedfrom": (el[23] !== null && el[23]!== undefined) ? el[23].toString():'', "totalpacksordered": (el[24] !== null && el[24]!== undefined) ? el[24].toString():'', "totalpricecustomerpays": (el[25] !== null && el[25]!== undefined) ? el[25].toString():'', "priceperpackclientpays": (el[26] !== null && el[26]!== undefined) ? el[26].toString():'',
            "shippingcostperorder": (el[27] !== null && el[27]!== undefined) ? el[27].toString():'', "totalpriceclientpays": (el[28] !== null && el[28]!== undefined) ? el[28].toString():'', "prescriptionattached": (el[29] !== null && el[29]!== undefined) ? el[29].toString():'', "directionsofuse": (el[30] !== null && el[30]!== undefined) ? el[30].toString():'',
            "rxwarningcautionarynote": (el[31] !== null && el[31]!== undefined) ? el[31].toString():'', "remarks": (el[32] !== null && el[32]!== undefined) ? el[32].toString():'', "quantity": (el[33] !== null && el[33]!== undefined) ? el[33].toString():'', "refill": (el[34] !== null && el[34]!== undefined) ? el[34].toString():'', "doctorname": (el[35] !== null && el[35]!== undefined) ? el[35].toString():''
            ,"onlinepharmacyName" : (el[36] !== null && el[36]!== undefined) ? el[36].toString():''
          }
            );
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

  const handleClose = () => setError({open:false, message:''});

  const saveOrders = async () => {

    const resp = await APIService(EndPoints.SAVE_ORDER , RequestType.POST,tempUpdate);

    if(resp.status == 200)
    {
      if(resp.data?.length > 0){
        setError({open:true, message:resp.data});
        notify("An error occured");
      } else {
        notify("Save Order successful");
        setTimeout(() => {
          navigate(`/Dashboard`, { state: "userData" })
        }, 2000);
      }
    }

  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ModalPopup handleClose={handleClose} open={error.open} data={error.message}/>
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
