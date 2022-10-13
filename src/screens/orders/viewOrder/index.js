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

const initialValues = {
  dataLoaded: false,
  oldRowData: [],
  fileUpload: {
    uploadedFileName: "",
    isFormInvalid: false
  }
}

let userDetails = JSON.parse(localStorage.getItem("userDetails"));

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

  const [trackingNo, setTrackingNo] = useState("");

  const [getSelectedRows, setSelectedRows] = useState([]);

  const notify = (message) => toast(message);

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

  const [printColumnDefs, setPrintColumnDefs] = useState([
    {headerName: 'Date', field: 'orderDate', minWidth: 200,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
      filter: 'agDateColumnFilter', filterParams: filterParams,
    },
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
    {headerName: 'Download Invoice', field: 'invoice', minWidth: 250, cellRenderer: downloadBtn}
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
      invoice([e.data]);
    }
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    const {value} = e.target;

    setTrackingNo(value);
  }

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

  const exportLabel = async () => {
    let selectedOrders = gridExistingRef.current.api.getSelectedRows().map( (item) =>  {
      return item.ordernumber;
    });

    const resp = await APIService(EndPoints.GET_LABEL_DETAILS , RequestType.POST,JSON.stringify({
      "Orders" : selectedOrders
    }) );

    if(resp.status == 200)
    {
      label(resp.data);
    }
  }

  const exportInvoice = async () => {
    let selectedOrders = gridExistingRef.current.api.getSelectedRows().map( (item) =>  {
      return item.ordernumber;
    });
    const resp = await APIService(EndPoints.GET_INVOICE_DETAILS , RequestType.POST,JSON.stringify({
      "Orders" : selectedOrders
    }) );

    if(resp.status == 200)
    {
      invoice(resp.data);
    }
  }

  const updateOrder = async () => {
    let selectedOrders = gridExistingRef.current.api.getSelectedRows().map( (item) =>  {
      return item.ordernumber;
    });
    //UpdateOrderDetails
    const resp = await APIService(EndPoints.UPDATE_ORDER , RequestType.POST,JSON.stringify({
      "Orders" : selectedOrders,
      "orderStatus" : "Completed",
      "trackingNo" : trackingNo,
    }) );

    if(resp.status == 200)
    {
      notify("Order updated successfully");
    }
  }

  const holdOrder = async () => {
    let selectedOrders = gridExistingRef.current.api.getSelectedRows().map( (item) =>  {
      return item.ordernumber;
    });
    //UpdateOrderDetails
    const resp = await APIService(EndPoints.UPDATE_ORDER , RequestType.POST,JSON.stringify({
      "Orders" : selectedOrders,
      "orderStatus" : "OnHold",

    }) );

    if(resp.status == 200)
    {
      notify("Order updated successfully");
    }
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
    const resp = await APIService(EndPoints.GET_ORDER , RequestType.POST,JSON.stringify({
      "customerId" : localStorage.getItem("userEmail") ,
      "status" : ""
    }) );

    if(resp.status == 200)
    {
      // notify("Customer details saved or updated successfully");
      // setTimeout(() => {
      //   navigate('/customerlist')

      // }, 2000);

      const data =  resp.data
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

    const resp = await APIService(EndPoints.GET_ORDER, RequestType.POST,JSON.stringify({
      "customerId" : localStorage.getItem("userEmail") ,
      "status" : status
    }));

    if(resp.status == 200)
    {
      // notify("Customer details saved or updated successfully");
      // setTimeout(() => {
      //   navigate('/customerlist')
      // }, 2000);
      const data = resp.data;

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
        getOrderDetailsByStatus('Confirmed');
        break;
      case 2:
        getOrderDetailsByStatus('OnHold');
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
                {userDetails.role !== 'customer' &&
                <MDBox pt={4} pb={3} px={3} sx={{ width: "100%"}}>
                  <MDBox mt={4} mb={1} className='buttonSpaceEvenly'>
                    <MDButton variant="gradient" color="info" onClick={exportInvoice}>
                      Export Invoice
                    </MDButton>
                    <MDButton variant="gradient" color="info" onClick={exportLabel}>
                      Export Label
                    </MDButton>
                  </MDBox>
                  <MDBox mt={4} mb={1} className='buttonSpaceEvenly'>
                    <MDBox className='buttonSpaceCenter'>
                      <MDBox>
                        <MDInput type="text" name="trackingno" value={trackingNo} onChange={handleInputChange}
                          label="Tracking Number" variant="standard" fullWidth />
                      </MDBox>
                      <MDButton variant="gradient" color="info" onClick={updateOrder} >
                        Update Order
                      </MDButton>
                    </MDBox>
                    <MDBox>
                      <MDButton variant="gradient" color="info" onClick={holdOrder} >
                        Hold Order
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>
                }
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
