import React,{useState, useEffect} from 'react'

import { makeStyles } from '@mui/styles';
import Api from '../../utils/Api';
import { Alert, Grid, Typography, Paper, Button, TextField } from '@mui/material';
import DateTimePicker from 'react-datetime-picker';
import { useNavigate } from 'react-router-dom';
import isAuth from '../../utils/Auth';

const useStyles = makeStyles(() => ({
  body: {
    padding: "60px 60px",
    margin: "10px",
  },
  inputBox: {
    width: "300px",
  },
  datePicker: {
    width: "300px",
    height:"50px"
  },
  submitButton: {
    width: "300px",
    backgroundColor: "#1e3c72",
  },
}));

function CreateJob() {
  const classes = useStyles();
  const[company, setCompany] = useState(null);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  const [job, setJob] = useState({
    job_id:null,
    job_offering_company:"",
    job_location:"",
    appointment:new Date(),
    facility_grade:null,
    experience_grade:"",
    education: "",
    course:"",
    job_type: "",
    age: null,
    email: localStorage.getItem("email"),
  })

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

  const postJob = ()=>{
    job.appointment = time;
    Api.post('/company/post-job', job)
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setAlert(!alert);
        setAlertMessage(err.response.data);
      })
  }

  const handleDateChange = (event) => {
    console.log(event.target.value);
    setTime(event.target.value);
  };

  return (
    <div>
      <Paper elevation={3} className={classes?.body} spacing={4}>
        <Grid container direction="column" spacing={4} alignItems="center">
          <Grid item>
            <Typography variant="h4" component="h3">Post A Job</Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Company Name"
              variant="outlined"
              defaultValue={job.job_offering_company}
              value={job.job_offering_company}
              onChange={(event) => setJob({ ...job, job_offering_company: event.target.value })}
              className={classes?.inputBox}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Job Location"
              variant="outlined"
              defaultValue={job.job_location}
              value={job.job_location}
              onChange={(event) => setJob({ ...job, job_location: event.target.value })}
              className={classes?.inputBox}
            />
          </Grid>
          <Grid item>
            <input 
              type="datetime-local" 
              id="appointment" 
              name="appointment"
              value={time}
              onChange={handleDateChange}
              className={classes?.datePicker}
            /> 
          </Grid>
          <Grid item>
            <TextField
              label="Facility Grade"
              variant="outlined"
              defaultValue={job.facility_grade}
              value={job.facility_grade}
              onChange={(event) => setJob({ ...job, facility_grade: event.target.value })}
              className={classes?.inputBox}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Experience Grade"
              variant="outlined"
              defaultValue={job.experience_grade}
              value={job.experience_grade}
              onChange={(event) => setJob({ ...job, experience_grade: event.target.value })}
              className={classes?.inputBox}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Education"
              variant="outlined"
              defaultValue={job.education}
              value={job.education}
              onChange={(event) => setJob({ ...job, education: event.target.value })}
              className={classes?.inputBox}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Course"
              variant="outlined"
              defaultValue={job.course}
              value={job.course}
              onChange={(event) => setJob({ ...job, course: event.target.value })}
              className={classes?.inputBox}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Job Type"
              variant="outlined"
              defaultValue={job.job_type}
              value={job.job_type}
              onChange={(event) => setJob({ ...job, job_type: event.target.value })}
              className={classes?.inputBox}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Max Age"
              variant="outlined"
              defaultValue={job.age}
              value={job.age}
              onChange={(event) => setJob({ ...job, age: event.target.value })}
              className={classes?.inputBox}
            />
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              className={classes?.submitButton}
              onClick={postJob}
            >Post</Button>
          </Grid>
          <Grid item>
            {alert && <Alert onClose={() => setAlert(!alert)} severity="error">{alertMessage}</Alert>}
          </Grid>
        </Grid>
      </Paper>

    </div>
  )
}

export default CreateJob