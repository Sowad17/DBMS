import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Api from '../../utils/Api';
import { Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const Card = ({ app }) => {
  return (
    <div className="card"
      style={{
        borderWidth: "2px",
        borderRadius: "5px",
        margin: "10px"
      }}
    >
      Name: {app.name}<br />
      Education: {app.education} <br />
      Experience: {app.experience} Years <br />
      Gender: {app.gender}<br />
    </div>
  );
};

const CardList = ({ data }) => {
  return (
    <div className="card-list">
      {data.map((item) => (
        <Card key={item.id} app={item} />
      ))}
    </div>
  );
};

const useStyles = makeStyles(() => ({
  body: {
    padding: "60px 60px",
    margin: "auto",
    justifyContent: 'center'
  },
  inputBox: {
    width: "300px",
    border: "2px"
  },
  submitButton: {
    width: "300px",
  },
}));


function ViewApplicants() {
  const classes = useStyles();
  const Location = useLocation();
  const props = Location.state;
  const [applicants, setApplicants] = useState([{}]);

  useEffect(() => {
    Api.post('/company/get-applicants', { job_id: props.job_id })
      .then((res) => {
        console.log(res);
        setApplicants(res.data);
      })
  }, [])
  return (
    <div>

      <Paper elevation={3} className={classes?.body}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <h1>{props.job_offering_company}</h1>
            <p >
              <p>
                Interview: {new Date(props.appointment).toLocaleString()}<br />
                Education: {props.education}<br />
                Facility Grade: {props.facility_grade}<br />
                Experience Grade: {props.experience_grade}<br />
                Total Applicants: {applicants?.length}
              </p>

            </p>
          </Grid>

          <Grid item>
            <CardList data={applicants}/>
          </Grid>

        </Grid>
      </Paper>

    </div>
  )
}

export default ViewApplicants;