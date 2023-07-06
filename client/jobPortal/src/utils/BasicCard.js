import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Role } from './Auth';
import { useNavigate } from 'react-router-dom';
import Api from './Api';
import { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
const theme = createTheme({
  palette: {
    red: {
      main: 'red',
      contrastText: '#fff',
    },
  },
});

export default function BasicCard(props) {

  const post = props.post;
  const navigate = useNavigate();
  const [owner, setOwner] = React.useState(false);

  const handleViewJob = () => {
    navigate('/view-job', { state: post });
  }

  const handleClick = () => {
    navigate('/view-applicants', { state: post });
  }

  useEffect(() => {
    Api.post('/jobseeker/get-profile', { email: localStorage.getItem("email") })
      .then((res) => {
        console.log(res);
        localStorage.setItem("js_id", res.data.js_id);
      }).catch((err) => {
        console.log(err);
      });
    Api.post('/company/is-owner', { email: localStorage.getItem("email"), job_id: post.job_id })
      .then((res) => {
        console.log(res);
        setOwner(res.data);
      }).catch((err) => {
        console.log(err);
      })
  }, [])

  const handleDelete = () => {
    Api.post('/company/delete-job', { job_id: post.job_id })
      .then((res) => {
        console.log(res);
        window.location.reload();
        Alert("Job deleted successfully");
      }).catch((err) => {
        console.log(err);
        Alert("Error deleting job");
      })
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Appointment at {new Date(post.appointment).toLocaleString()}
        </Typography>
        <Typography variant="h5" component="div">
          {post.job_offering_company}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Facility Grade: {post.facility_grade}
        </Typography>
        <Typography variant="body2">
          Experience Grade: {post.experience_grade}
        </Typography>
      </CardContent>

      <CardActions>
        {(Role() === "jobseeker") &&
          <Button
            size="small"
            onClick={handleViewJob}>
            View Job
          </Button>
        }
        {(Role() === "company") && owner &&
          <Button size="small"
            onClick={handleClick}>
            View Applicants
          </Button>
        }
        {(Role() === "company") && owner &&
          <ThemeProvider theme={theme}>
            <Button
              onClick={handleDelete}
              size="small"
              color="red"
              variant="contained">
              Delete Job
            </Button>
          </ThemeProvider>
        }
      </CardActions>
    </Card>
  );
}