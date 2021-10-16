import { push } from "connected-react-router";
import { useSelector } from "react-redux";
import axiosService from "../../services/axiosService";


const RegisterAction = (values) => (dispatch) => 
{
    try {
        
        dispatch({type: "LOAD_OPEN"});
        //var users = useSelector(redux => redux.users);
        //console.log(values);
        var formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
        });

        //dispatch(LoadAction(users));
        axiosService.send('api/account/register', formData, 'multipart/form-data')
        .then(resolve => {
            dispatch({type: "LOGIN", payload: resolve.data});
            dispatch({type: "LOAD_CLOSE"});
            dispatch(push("/"));
            })
            .catch(err => {
                alert(err.response.data.error);
                dispatch({type: "LOAD_CLOSE"});
            });

            
    } catch (err) {
        console.log(err.response.data.error);
    }
}

export default RegisterAction;