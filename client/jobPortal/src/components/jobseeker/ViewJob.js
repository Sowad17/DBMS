import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Api from '../../utils/Api';
import { Button, Grid, Paper, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { BorderColor } from '@mui/icons-material';

const Card = ({ app }) => {
    return (
        <div className="card"
            style={{
                borderWidth: "2px",
                borderRadius: "5px",
                backgroundColor: "ActiveBorder",
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
        border: "2px",
    },
    submitButton: {
        // width: "300px",
    },
    horizontal:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    }
}));


function ViewJob() {
    const classes = useStyles();
    const Location = useLocation();
    const post = Location.state;
    const [job, setJob] = useState([{}]);

    useEffect(() => {
        Api.post('/jobseeker/get-job', { job_id: post.job_id })
            .then((res) => {
                console.log(res);
                setJob(res.data);
            })
    }, [])

    const handleViewJob = () => {
        Api.post('/jobseeker/apply',
            { js_id: localStorage.getItem("js_id"), job_id: post.job_id })
            .then((res) => {
                console.log(res);
                alert("Applied Successfully");
            }).catch((err) => {
                console.log(err);
                alert("Already Applied");
            });
    }

    return (
        <div>

            <Paper elevation={3} className={classes?.body}>
                <Grid container spacing={2} direction="column">
                    <Grid item className={classes.inputBox}>
                        <div className={classes.horizontal}>
                            <h1>{post.job_offering_company}</h1>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleViewJob}
                                    className={classes.submitButton}>
                                    Apply
                                </Button>
                            </Grid>
                        </div>
                        <p >
                            <p>
                                <span><b>Interview:</b>  {new Date(post.appointment).toLocaleString()}<br /></span>
                                <span><b>Education:</b>  {post.education}<br /></span>
                                <span><b>Facility Grade:</b>  {post.facility_grade}<br /></span>
                                <span><b>Experience Grade:</b>  {post.experience_grade}<br /></span>
                            </p>

                        </p>
                    </Grid>

                    <Grid item>
                        <TextField
                            id="outlined-multiline-static"
                            label="Job Type"
                            value={post?.job_type}
                            InputProps={{
                                readOnly: true
                            }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-multiline-static"
                            label="Company Name"
                            value={job?.company_name}
                            InputProps={{
                                readOnly: true
                            }}
                            InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-multiline-static"
                            label="Net Worth( $ )"
                            value={job?.net_worth}
                            InputProps={{
                                readOnly: true
                            }}
                            InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item>
                        <TextField
                            type='text'
                            id="outlined-basic"
                            label="Mobile Number"
                            variant='outlined'
                            value={job?.mobile_no}
                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-multiline-static"
                            label="City"
                            value={job?.city}
                            InputProps={{
                                readOnly: true
                            }}
                            InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-multiline-static"
                            label="Established Year"
                            value={job?.established_year}
                            InputProps={{
                                readOnly: true
                            }}
                            InputLabelProps={{ shrink: true }} />
                    </Grid>


                </Grid>
            </Paper>

        </div>
    )
}

export default ViewJob;