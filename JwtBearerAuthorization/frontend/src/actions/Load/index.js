import { push } from "connected-react-router";
import { useSelector } from "react-redux";
import axiosService from "../../services/axiosService";

const LoadAction = (users, userData) => (dispatch) => 
{
    
    try 
    {
        dispatch({ type: "LOAD_OPEN" });
        
        if (users.length == 0) {
            axiosService.sendWithToken('api/account/get', {}, 'application/json', userData.token)
                .then(data => {
                    dispatch({ type: "INIT", payload: data.data });
                }).catch(err => { 
                    dispatch(push("/login"));
                });
            }
            dispatch({ type: "LOAD_CLOSE" });
            dispatch(push("/"));
    }
    catch(err) 
    {
        console.log(err);
    }
} 

export default LoadAction;