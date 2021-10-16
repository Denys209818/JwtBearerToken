import { push } from "connected-react-router";
import axiosService from "../../services/axiosService";


const LoginUser = (data) => (dispatch) => {
    dispatch({type: "LOAD_OPEN"});
    var result = axiosService.send('api/account/login', data, 'application/json');
            result.then(data => {
                console.log(data);
                dispatch({type: "LOGIN", payload: data.data});
                dispatch({type: "LOAD_CLOSE"});
                dispatch(push("/"));
            })
            .catch(err => {
                alert(err.response.data.error);
                dispatch({type: "LOAD_CLOSE"});
            });
    
}

export default LoginUser;