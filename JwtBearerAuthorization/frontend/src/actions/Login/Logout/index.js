import axiosService from "../../../services/axiosService";


const LogoutUser = (auth) => (dispatch) => {
    axiosService.send('api/account/logout', {
        email: auth.email
    }, 'application/json')
    .then(data => {
         dispatch({type: "LOGOUT"});
     });
}

export default LogoutUser;