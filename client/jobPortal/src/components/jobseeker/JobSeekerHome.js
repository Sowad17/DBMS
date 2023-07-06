import React, { useEffect, useState } from 'react'

import BasicCard from "../../utils/BasicCard";
import { Grid } from "@mui/material";
import Api from '../../utils/Api';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  header: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  main:{
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
  }

}));

function JobSeekersHome() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [posts2, setPosts2] = useState([]);
  useEffect(() => {
    Api.post('/company/get-jobs', { email: localStorage.getItem("email") })
      .then((res) => {
        console.log(res);
        setPosts(res.data);
        setPosts2(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    // console.log(e.target.value+" "+e.target.value.length);
    if (e.target.value.length === 0) {
      setPosts(posts2);
      return;
    }
    var post3 = [];
    var filtr = e.target.value.toLowerCase();
    console.log(filtr)
    posts.map((post) => {
      var tag = post.job_offering_company.toLowerCase();
      // console.log(tag)
      var f = (tag.length >= filtr.length);
      // console.log(f);
      for (var j = 0; j < filtr.length && f; ++j) {
        if (filtr[j] !== tag[j]) {
          f = false;
          break;
        }
      }
      if (f) {
        post3.push(post);
      }
      return post3
    })
    setPosts(post3);
  }

  return (
    <div  className={classes.main}>
      <div className={classes.header}>
        <h1>Currently Available jobs</h1>
        <div className="search">
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search"
            onChange={searchHandler}
            autoComplete='off'
            inputProps={{
              autoComplete: 'new-password',
              form: {
                autoComplete: 'off',
              }
            }}
          />
        </div>
      </div>

      <div className='posts'>
        <Grid container direction="column" spacing={4} alignItems="center">
          {
            posts.map((post, i) => (
              <Grid item>
                <BasicCard
                  key={i}
                  post={post}
                />
              </Grid>
            ))
          }
        </Grid>
      </div>
    </div>
  )
}

export default JobSeekersHome