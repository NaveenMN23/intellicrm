import {useEffect, useState} from 'react'
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import  CustomizedTables from './../../components/Tables/DefaultDataTable';
import Divider from '@mui/material/Divider';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function Invoice() {

    useEffect(() => {

    },[])

    return (
        <Box >            
            <Grid container sx={{display:'block'}} >
                <Grid >
                    <Item>     
                    <Typography variant="h1">
                        Name
                    </Typography>
                    </Item>

                    <Item>     
                    <Typography variant="h6" align='left' >
                        Date
                    </Typography>
                    <Typography variant="h6" align='left'>
                        OrderRefference
                    </Typography>
                    <Typography variant="h6" align='left'>
                        CustomerName
                    </Typography>
                    <Typography variant="h6" align='left'>
                        Address
                    </Typography>
                    </Item>
                    <Item>     
                    <Typography variant="h4" sx={{textDecorationLine: 'underline'}}>
                            CHECK YOUR ORDER CAREFULLY
                    </Typography>
                    </Item>
                    <Item>     
                    <Typography variant="h6" align='left' sx={{textDecorationLine: 'underline'}}>
                        Client Reference
                    </Typography>
                    </Item>
                    <Item>
                        <CustomizedTables/>
                    </Item>
                    <Item>
                    <Box component="span" sx={{ display:'flex', p: 2, border: '1px solid black' }}>
                    <Typography variant="h6" align='left' >
                        Expiry date: 
                        </Typography>
                        <Divider orientation="vertical" flexItem />
                        <Typography  variant="h6" align='right' >
                        Batch No:
                        </Typography>
                    </Box>
                    </Item>
                    <Item>
                    <Typography variant="h6" align='right' paragraph={true}>
                        Subtotal : 50$
                        </Typography>
                        
                    <Typography variant="h6" align='right' paragraph={true}>
                    Shipping :  &nbsp;0$
                        </Typography>
                        
                    <Typography variant="h6" align='right' paragraph={true}>
                        Total : 50$
                        </Typography>
                        
                    </Item>
                    <Item>
                    <Typography variant="h6" align='left' paragraph={true}>
                        The above product(s) were dispensed by Green Cure (Mauritius) Ltd, Jinfei, Mauritius for CAPITALONLINEPHARMACY.com. 
                    </Typography>
                    <Typography variant="h6" align='left' paragraph={true}>
For consultation with the pharmacist, kindly call CAPITALONLINEPHARMACY.COM at phone number 9876543210 and request pharmacist assistance.
</Typography>
<Typography variant="h6" align='left' paragraph={true}>
For any other queries regarding your order, please call CAPITALONLINEPHARMACY.COM at phone number 9876543210 and speak to a customer relationship agent.
</Typography>

                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Invoice;