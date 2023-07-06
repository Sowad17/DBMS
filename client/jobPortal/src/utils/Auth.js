const isAuth = () => {
    // console.log(localStorage.getItem("email"));
    return localStorage.getItem("email");
};

export const Role = () => {
    // console.log(localStorage.getItem("role"));
    return localStorage.getItem("role");
};

export default isAuth;
