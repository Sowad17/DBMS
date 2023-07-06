import React, { useEffect, useState } from 'react'
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
} from '@mui/material'
import { Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Api from '../../utils/Api';
import isAuth from '../../utils/Auth';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';


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

function JobSeekerProfile() {
  const classes = useStyles();
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [jobseeker, setJobseeker] = useState({
    js_id: null,
    name: "",
    dob: dayjs(new Date().toISOString()),
    gender: "",
    experience: "",
    courses: "",
    address: "",
    mobile_no: "",
    email: isAuth(),
    education: "",
    age: null
  });

  useEffect(() => {
    Api.post('/jobseeker/get-profile', { email: isAuth() })
      .then((res) => {
        console.log(res);
        setJobseeker(res.data);
        localStorage.setItem("id", res.data.js_id)
      })
      .catch((err) => {
        console.log(err);
        setAlert(!alert);
        setAlertMessage(err.response.data);
      })
  }, [])

  const handleSave = (e) => {
    e.preventDefault();
    Api.post('/jobseeker/update-profile', jobseeker)
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
            <Typography variant="h4" component="h3">Candidate Profile</Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Name"
              variant="outlined"
              defaultValue={jobseeker.name}
              value={jobseeker.name}
              onChange={(event) => setJobseeker({ ...jobseeker, name: event.target.value })}
              className={classes?.inputBox}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          {/* <Grid item  className={classes?.inputBox}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateField']}>
                <DemoItem label="Date of Birth">
                  <DateField defaultValue={jobseeker.dob} 
                    onChange={(e)=>setJobseeker({...jobseeker, dob: e.target.value})}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </Grid> */}
          <Grid item>
            <TextField
              label="Gender"
              variant="outlined"
              defaultValue={jobseeker.gender}
              value={jobseeker.gender}
              onChange={(event) => setJobseeker({ ...jobseeker, gender: event.target.value })}
              className={classes?.inputBox}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Experience"
              variant="outlined"
              defaultValue={jobseeker.experience}
              value={jobseeker.experience}
              onChange={(e) => setJobseeker({ ...jobseeker, experience: e.target.value })}
              className={classes?.inputBox}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Courses"
              variant="outlined"
              defaultValue={jobseeker.courses}
              value={jobseeker.courses}
              onChange={(event) => setJobseeker({ ...jobseeker, courses: event.target.value })}
              className={classes?.inputBox}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Address"
              variant="outlined"
              defaultValue={jobseeker.address}
              value={jobseeker.address}
              onChange={(event) => setJobseeker({ ...jobseeker, address: event.target.value })}
              className={classes?.inputBox}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Mobile Number"
              variant="outlined"
              defaultValue={jobseeker.mobile_no}
              value={jobseeker.mobile_no}
              onChange={(event) => setJobseeker({ ...jobseeker, mobile_no: event.target.value })}
              className={classes?.inputBox}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Email"
              abel="Email"
              variant="outlined"
              defaultValue={jobseeker.email}
              InputProps={{
                readOnly: true,
              }}
              className={classes?.inputBox}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Education"
              variant="outlined"
              defaultValue={jobseeker.education}
              value={jobseeker.education}
              onChange={(event) => setJobseeker({ ...jobseeker, education: event.target.value })}
              className={classes?.inputBox}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Age"
              variant="outlined"
              defaultValue={jobseeker.age}
              value={jobseeker.age}
              onChange={(event) => setJobseeker({ ...jobseeker, age: event.target.value })}
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

export default JobSeekerProfile