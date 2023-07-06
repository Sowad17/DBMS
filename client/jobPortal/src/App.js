import { createContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, useNavigate
} from 'react-router-dom';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import './App.css';
import isAuth, { Role } from './utils/Auth';
import Navbar from './Navbar';
import MessagePopup from './utils/MessagePopup';
import Login from './components/Login';
import Register from './components/Register';
import JobSeekerHome from './components/jobseeker/JobSeekerHome';
import CompanyHome from './components/company/CompanyHome';
import JobSeekerProfile from './components/jobseeker/JobSeekerProfile';
import CompanyProfile from './components/company/CompanyProfile';
import CreateJob from './components/company/CreateJob';
import SelectionTeam from './components/company/SelectionTeam';
import Applications from './components/jobseeker/Applications';
import MyJobs from './components/company/MyJobs';
import ViewApplicants from './components/company/ViewApplicants';
import ViewJob from './components/jobseeker/ViewJob';

const useStyles = makeStyles(() => ({
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "98vh",
    paddingTop: "64px",
    boxSizing: "border-box",
    width: "100%",
  },
}));

export const SetPopupContext = createContext();

function App() {
  // let navigate = useNavigate();
  const classes = useStyles();
  const [auth, setAuth] = useState(isAuth());
  const [role, setRole] = useState(Role());

  const [popup, setPopup] = useState({
    open: false,
    severity: "success",
    message: "",
  });


  return (

    <Router>
      <SetPopupContext.Provider value={setPopup}>
        <Grid container direction="column">
          <Grid item>
            <Navbar />
          </Grid>
          <Grid item className={classes.body}>
            <Routes>
              <Route exact path="/login" element={
                isAuth() ? (Role() === "company" ? (<CompanyHome />) : (<JobSeekerHome />)) : (<Login />)
              } />
              <Route exact path="/register" element={
                isAuth() ? (Role() === "company" ? (<CompanyHome />) : (<JobSeekerHome />)) : (<Register />)
              } />
              <Route path='/'
                element={
                  isAuth() ? (Role() === "company" ? (<CompanyHome />) : (<JobSeekerHome />)) : (<Login />)
                }
              />
              <Route path='/profile'
                element={
                  isAuth() ? (Role() === "company" ? (<CompanyProfile />) : (<JobSeekerProfile />)) : (<Login />)
                }
              />
              <Route path='/post-job'
                element={
                  isAuth()&&Role()==='company'? (<CreateJob/>) : (<Login />)
                }
              />
              <Route path='/selection-team'
                element={
                  isAuth()&&Role()==='company'? (<SelectionTeam/>) : (<Login />)
                }
              />
              <Route path='/my-jobs'
                element={
                  isAuth()&&Role()==='company'? (<MyJobs/>) : (<Login />)
                }
              />
              <Route path='/applications'
                element={
                  isAuth()&&Role()==='jobseeker'? (<Applications/>) : (<Login />)
                }
              />
              <Route path='/view-applicants'
                element={
                  isAuth()&&Role()==='company'? (<ViewApplicants/>) : (<Login />)
                }
              />
              <Route path='/view-job'
                element={
                  isAuth()&&Role()==='jobseeker'? (<ViewJob/>) : (<Login />)
                }
              />
            </Routes>
          </Grid>
        </Grid>
        {/* <MessagePopup
          open={popup.open}
          setOpen={(status) =>
            setPopup({
              ...popup,
              open: status,
            })
          }
          severity={popup.severity}
          message={popup.message}
        /> */}
      </SetPopupContext.Provider>
    </Router>

  );
}

export default App;
