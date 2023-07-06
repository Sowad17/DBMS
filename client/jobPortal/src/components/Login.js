import { Alert, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { useContext, useState } from "react";

import Api from "../utils/Api";
import { redirect, useNavigate } from "react-router-dom";
import { SetPopupContext } from "../App";
import isAuth from "../utils/Auth";
import EmailInput from "../utils/EmailInput";
import PasswordInput from "../utils/PasswordInput";

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
    },
}));

const Login = () => {
    const navigate = useNavigate()
    const classes = useStyles();
    const setPopup = useContext(SetPopupContext);
    const [loggedin, setLoggedin] = useState(isAuth());
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
    });
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [inputErrorHandler, setInputErrorHandler] = useState({
        email: {
            error: false,
            message: "",
        },
        password: {
            error: false,
            message: "",
        },
    });

    const handleInput = (key, value) => {
        setLoginDetails({
            ...loginDetails,
            [key]: value,
        });
    };

    const handleInputError = (key, status, message) => {
        setInputErrorHandler({
            ...inputErrorHandler,
            [key]: {
                error: status,
                message: message,
            },
        });
    };

    const handleLogin = () => {
        Api.post("/auth/login", loginDetails)
            .then((res) => {
                console.log(res);
                localStorage.setItem("email", res.data.email);
                localStorage.setItem("role", res.data.role);
                // setLoggedin(isAuth());
                navigate('/');
                window.location.reload(false);
            }).catch((err) => {
                console.log(err);
                setAlert(!alert);
                setAlertMessage(err.response.data);
            });
    };

    return loggedin ? redirect("/") : (
        <Paper elevation={3} className={classes?.body} spacing={4}>
            <Grid container direction="column" spacing={4} alignItems="center">
                <Grid item>
                    <Typography variant="h3" component="h2">Login</Typography>
                </Grid>
                <Grid item>
                    <EmailInput
                        label="Email"
                        value={loginDetails.email}
                        onChange={(event) => handleInput("email", event.target.value)}
                        inputErrorHandler={inputErrorHandler}
                        handleInputError={handleInputError}
                        className={classes?.inputBox}
                        inputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item>
                    <PasswordInput
                        label="Password"
                        value={loginDetails.password}
                        onChange={(event) => handleInput("password", event.target.value)}
                        className={classes?.inputBox}
                        inputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleLogin()}
                        className={classes?.submitButton}
                    >
                        Login
                    </Button>
                </Grid>
                <Grid item>
                    {alert && <Alert onClose = {()=>setAlert(!alert)} severity="error">{alertMessage}</Alert>}
                </Grid>
            </Grid>

        </Paper>
    );
}

export default Login;