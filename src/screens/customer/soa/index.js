// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "./../../../components/MDBox";
import MDTypography from "./../../../components/MDTypography";

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import DashboardLayout from "./../../../components/DashboardLayout";
import DashboardNavbar from "./../../../components/DashboardNavbar";

import { useState, useEffect, useMemo, useRef } from 'react';
import {APIService} from "./../../../services/rootService";
import {EndPoints, RequestType} from "./../../../services/apiConfig";

const initialValues = {
  dataLoaded: false,
  oldRowData: [],
}

const Soa = () => {

    const gridRef = useRef();

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
      {headerName: 'Order', field:'orderId', minWidth: 150},
      {headerName: 'Date', field: 'orderDate', minWidth: 200,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
        filter: 'agDateColumnFilter', filterParams: filterParams,
      },
      {headerName: 'Product ID', field:'productId', minWidth: 200},
      {headerName: 'Quantity', field:'quantity', minWidth: 150},
      {headerName: 'Total Amount', field:'totalAmount', minWidth: 200},
    ]);

    const defaultReadonlyColDef = useMemo(() => ({
      sortable: true,
      filter: true,
      editable: false,
      flex: 1,
    }), []);

    //ag-Grid hook ready
    const onGridReady = params => {

      params.api.resetRowHeights();

    };

    // const getRecentIndex = () => {
    //   return 1;
    // }

    const getSOADetails = async () => {
      const resp = await APIService(EndPoints.GET_SOA_DETAILS+"?customerId="+localStorage.getItem("userEmail") , RequestType.GET);

      if(resp.status == 200)
      {
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

    useEffect(() => {
      getSOADetails();
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
                      Statement Of Account
                    </MDTypography>
                  </MDBox>

                  <MDBox pt={4} pb={3} px={3} sx={{ width: "100%", bgcolor: 'background.paper' }}>
                    <MDBox px={1}>
                      {rowData && rowData.oldRowData &&
                        <AgGridReact
                        ref={gridRef}
                        onGridReady={onGridReady}
                        rowData = {rowData.oldRowData}
                        columnDefs = {columnDefs}
                        animateRows = {true}
                        pagination={true}
                        defaultColDef = {defaultReadonlyColDef}
                        style={{ fontSize: '15px', width: '100%' }}/>}
                    </MDBox>
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
      </DashboardLayout>
    )
}

export default Soa;
