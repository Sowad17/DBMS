import { useState, useContext } from "react";
import {
    Grid,
    TextField,
    Button,
    Typography,
    Paper,
    MenuItem,
} from "@mui/material";
import {Alert} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import isAuth from "../utils/Auth";
import { redirect } from "react-router-dom";
import { SetPopupContext } from "../App";
import EmailInput from "../utils/EmailInput";
import PasswordInput from "../utils/PasswordInput";
import Api from "../utils/Api";

const useStyles = makeStyles(() => ({
    body: {
        padding: "60px 60px",
    },
    inputBox: {
        width: "400px",
    },
    submitButton: {
        width: "400px",
    },
}));



const Register = (props) => {
    const classes = useStyles();
    const [loggedIn, setLoggedin] = useState(isAuth());
    const setPopup = useContext(SetPopupContext);
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const [signupDetails, setSignupDetails] = useState({
        email: "",
        password: "",
        role: "",
    });

    const handleInput = (key, value) => {
        setSignupDetails({
            ...signupDetails,
            [key]: value,
        });
    }
    const [inputErrorHandler, setInputErrorHandler] = useState({
        email: {
            untouched: true,
            required: true,
            error: false,
            message: "",
        },
        password: {
            untouched: true,
            required: true,
            error: false,
            message: "",
        },
    });
    const handleInputError = (key, status, message) => {
        setInputErrorHandler({
            ...inputErrorHandler,
            [key]: {
                required: true,
                untouched: false,
                error: status,
                message: message,
            },
        });
    };
    const handleRegistration = () => {
        Api.post("/auth/register", signupDetails)
            .then((res) => {
                localStorage.setItem("email", signupDetails.email);
                localStorage.setItem("role", signupDetails.role);
                // setLoggedin(isAuth());
                navigate("/");
                window.location.reload(false);
            }).catch((err) => {
                console.log(err);
                setAlert(!alert);
                setAlertMessage(err.response.data)
            });
    }
    return loggedIn ? redirect("/") : (
        <Paper elevation={3} className={classes.body}>
            <Grid container direction="column" spacing={4} alignItems="center">
                <Grid item>
                    <Typography variant="h3" component="h2">
                        Register
                    </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        select
                        label="Register As"
                        variant="outlined"
                        className={classes.inputBox}
                        value={signupDetails.role}
                        onChange={(event) => {
                            handleInput("role", event.target.value)
                        }}
                    >
                        <MenuItem value="jobseeker">Job Seeker</MenuItem>
                        <MenuItem value="company">Company</MenuItem>
                    </TextField>
                </Grid>
                <Grid item>
                    <EmailInput
                        label="Email"
                        value={signupDetails.email}
                        onChange={(event) => handleInput("email", event.target.value)}
                        inputErrorHandler={inputErrorHandler}
                        handleInputError={handleInputError}
                        className={classes.inputBox}
                        required={true}
                        inputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item>
                    <PasswordInput
                        label="Password"
                        value={signupDetails.password}
                        onChange={(event) => handleInput("password", event.target.value)}
                        className={classes.inputBox}
                        error={inputErrorHandler.password.error}
                        helperText={inputErrorHandler.password.message}
                        onBlur={(event) => {
                            if (event.target.value === "") {
                                handleInputError("password", true, "Password is required");
                            } else {
                                handleInputError("password", false, "");
                            }
                        }}
                        inputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            handleRegistration();
                        }}
                        className={classes.submitButton}
                        
                    >
                        Register
                    </Button>
                </Grid>
                <Grid item>
                    {alert && <Alert onClose = {()=>setAlert(!alert)} severity="error">{alertMessage}</Alert>}
                </Grid>
            </Grid>
        </Paper>
    )
}
export default Register;