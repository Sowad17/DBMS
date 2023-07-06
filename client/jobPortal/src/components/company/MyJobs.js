import React, { useEffect, useState } from 'react'

import BasicCard from "../../utils/BasicCard";
import { Grid } from "@mui/material";
import Api from '../../utils/Api';

function MyJobs() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Api.post('/company/my-jobs', { email: localStorage.getItem("email") })
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [])


  return (
    <div>
      <h1>My Jobs</h1>

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

export default MyJobs