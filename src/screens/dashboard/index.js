
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "./../../components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "./../../components/DashboardLayout";
import DashboardNavbar from "./../../components/DashboardNavbar";
import ReportsBarChart from "./../../components/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "./../../components/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "./../../components/Cards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "./data/reportsBarChartData";
import reportsLineChartData from "./data/reportsLineChartData";

import { useMaterialUIController,setLoginUserId } from "./../../context";

import {PrintDocument} from './../../components/PdfPrinter';
import { useState, useEffect, useMemo } from "react";

import Invoice from './../../Reports/Invoice';

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  const [controller, dispatch] = useMaterialUIController();

  const { LoginUserId  } = controller;

  useEffect( () => {
    //PrintDocument('<div><b>Sample input document.</b></div>')
  },[]);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Recent Orders"
                count={281}
                percentage={{
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Order in progress"
                count="2,300"
                percentage={{

                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Completed Order"
                count="34k"
                percentage={{

                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="On hold Order"
                count="+91"
                percentage={{
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Order's Completed"
                  description="Current Week"
                  date=""
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            {/*<Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Order's Completed"
                  description="Current Week"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Order's Completed"
                  description="Current Month"
                  date=""
                  chart={tasks}
                />
              </MDBox>
            </Grid>*/}
          </Grid>
        </MDBox>
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
