import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const styles = {
    backgroundContainer: {
        backgroundImage: `url(https://uploads-ssl.webflow.com/62929a347e3c95791fb64325/62948d7acc1292f0c534cd3d_blog18.svg)`,
        backgroundRepeat: `repeat repeat`,
        minHeight: '100vh'
    },
    mainContainer: {
        backgroundColor:'#fff',
        boxShadow: 'rgb(0 0 0) 0px 20px 30px, rgb(0 0 0) 0px 20px 30px',
        marginTop: '30px',
        marginBottom: '30px'
    }
};


export default function CreateUser() {

const [customerType, setCustomerType] = React.useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      type: customerType,
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      password: data.get('password'),
    });
  };

  const handleChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    const data = event.target.value;
    // console.log("data", data);
    setCustomerType(data)
  }

  return (
    <ThemeProvider theme={theme}>
        <Grid container style={styles.backgroundContainer} >
        <Container component="main" maxWidth="xs" style={styles.mainContainer}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Create User
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={customerType}
                        label="Type"
                        onChange={handleChange}
                        autoFocus
                    >
                        <MenuItem value={0}>Select</MenuItem>
                        <MenuItem value={1}>Customer</MenuItem>
                        <MenuItem value={2}>Sub Admin</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>
                {customerType && customerType == '1' ?
                <><Grid item xs={12}>
                    <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name" />
                </Grid><Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name" />
                    </Grid><Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password" />
                    </Grid></> 
                    :
                    <><Grid item xs={12}>
                    <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="Name" />
                    </Grid><Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password" />
                    </Grid>
                    </>
            }
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create User
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 3, mb: 3 }} />
      </Container>
      </Grid>
    </ThemeProvider>
  );
}