import { Box, Container } from '@mui/material';
import { CustomerListResults } from './../../components/customer/customerListResult';
import { CustomerListToolbar } from './../../components/customer/customerListToolbar';
// import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from './../../__mocks__/customers';

const Customers = () => (
  <>
        Customers | Material Kit
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);
// Customers.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

export default Customers;