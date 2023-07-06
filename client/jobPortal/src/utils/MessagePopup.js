import { Alert } from "@mui/material";
import {Snackbar} from "@mui/material";

const MessagePopup = (props) => {
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        props.setPopup(false);
    };
    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.severity}>
                {props.message}
            </Alert>
        </Snackbar>
    );
};
export default MessagePopup;