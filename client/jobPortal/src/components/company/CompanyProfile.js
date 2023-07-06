import React, { useEffect, useState } from 'react'
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
} from '@mui/material'
import {Alert} from '@mui/material';

import { makeStyles } from '@mui/styles';

import Api from '../../utils/Api';
import isAuth from '../../utils/Auth';


const useStyles = makeStyles(() => ({
  body: {
    padding: "60px 60px",
    margin: "10px",
  },
  inputBox: {
    width: "300px",
  },
  submitButton: {
    width: "300px",
    backgroundColor: "#1e3c72",
  },
}));

function CompanyProfile() {
  const classes = useStyles();
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [company, setCompany] = useState({
    company_id: null,
    company_name: "abc company",
    net_worth: null,
    mobile_no: "",
    email: isAuth(),
    website: "",
    established_year: null,
    city: "",
  });

  useEffect(() => {
    Api.post('/company/get-profile', { email: isAuth() })
      .then((res) => {
        console.log(res);
        setCompany(res.data);
        localStorage.setItem("company_id", res.data.company_id);
      })
      .catch((err) => {
        console.log(err);
        setAlert(!alert);
        setAlertMessage(err.response.data);
      })
  }, [])

  const handleSave = (e) => {
    e.preventDefault();
    Api.post('/company/update-profile', company)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div>
      <Paper elevation={3} className={classes?.body} spacing={4}>
        <Grid container direction="column" spacing={4} alignItems="center">
          <Grid item>
            <Typography variant="h4" component="h3">Company Profile</Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Company Name"
              variant="outlined"
              defaultValue={company.company_name}
              value={company.company_name}
              onChange={(event) => setCompany({ ...company, company_name: event.target.value })}
              className={classes?.inputBox}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Net Worth($)"
              variant="outlined"
              defaultValue={company.net_worth}
              value={company.net_worth}
              onChange={(event) => setCompany({ ...company, net_worth: event.target.value })}
              className={classes?.inputBox}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Mobile No."
              variant="outlined"
              defaultValue={company.mobile_no}
              value={company.mobile_no}
              onChange={(event) => setCompany({ ...company, mobile_no: event.target.value })}
              className={classes?.inputBox}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Email"
              variant="outlined"
              defaultValue={company.email}
              InputProps={{
                readOnly: true,
              }}
              className={classes?.inputBox}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Website"
              variant="outlined"
              defaultValue={company.website}
              value={company.website}
              onChange={(event) => setCompany({ ...company, website: event.target.value })}
              className={classes?.inputBox}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Established Year"
              variant="outlined"
              defaultValue={company.established_year}
              value={company.established_year}
              onChange={(event) => setCompany({ ...company, established_year: event.target.value })}
              className={classes?.inputBox}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="City"
              variant="outlined"
              defaultValue={company.city}
              value={company.city}
              onChange={(event) => setCompany({ ...company, city: event.target.value })}
              className={classes?.inputBox}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              className={classes?.submitButton}
              onClick={handleSave}
            >Save</Button>
          </Grid>
          <Grid item>
            {alert && <Alert onClose={() => setAlert(!alert)} severity="error">{alertMessage}</Alert>}
          </Grid>
        </Grid>
      </Paper>


    </div>
  )
}

export default CompanyProfile