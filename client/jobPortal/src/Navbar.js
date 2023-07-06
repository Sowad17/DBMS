import { AppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import isAuth, { Role } from "./utils/Auth";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        fontFamily: "Montserrat",
    },
}));

const Navbar = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleClick = (path) => {
        console.log(path);
        if(path==="/logout"){
            localStorage.clear();
            window.location.reload(false);
            console.log("nav: "+localStorage.getItem("role"+" "+localStorage.getItem("email")));
            navigate("/login");
        }else{
            console.log(localStorage.getItem("role")+" "+localStorage.getItem("email"));
            navigate(path);
        }
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography 
                variant="h6" 
                className={classes.title}
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}>
                    Job Portal
                </Typography>

                {isAuth() ? (
                    Role() === "company" ? (
                        <>
                            <Button color="inherit" onClick={() => handleClick("/")}>
                                Home
                            </Button>
                            <Button color="inherit" onClick={() => handleClick("/post-job")}>
                               Post A Job
                            </Button>
                            <Button color="inherit" onClick={() => handleClick("/my-jobs")}>
                                My Jobs
                            </Button>
                            {/* <Button color="inherit" onClick={() => handleClick("/selection-team")}>
                                Selection Team
                            </Button> */}
                            <Button color="inherit" onClick={() => handleClick("/profile")}>
                                Profile
                            </Button>
                            <Button color="inherit" onClick={() => handleClick("/logout")}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => handleClick("/")}>
                                Home
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => handleClick("/applications")}
                            >
                                Applications
                            </Button>
                            <Button color="inherit" onClick={() => handleClick("/profile")}>
                                Profile
                            </Button>
                            <Button color="inherit" onClick={() => handleClick("/logout")}>
                                Logout
                            </Button>
                        </>
                    )
                ) : (
                    <>
                        <Button color="inherit" onClick={() => handleClick("/login")}>
                            Login
                        </Button>
                        <Button color="inherit" onClick={() => handleClick("/register")}>
                            Register
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
