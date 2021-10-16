import { push } from "connected-react-router";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LoginUser from "../../actions/Login";
import axiosService from "../../services/axiosService";
import FormTextInput from "../common/FormTextInput";
import loginValidation from './validationLogin'
import './../../css/loader.css';

const Login = () => {
    var initialValues= {
        email: '',
        password: ''
    };

    var auth = useSelector(redux => redux.auth);
    var loader = useSelector(redux => redux.loader);
    var dispatch = useDispatch();

    const onLoginSubmit = (data) => {
        try 
        {
            dispatch(LoginUser(data));
            
        }
        catch(err) {
            console.log(err.response);
        };
    }

    return (
        <div className="container mt-4">
            {loader.isLoad && <div className="ownmodal">
            <div className="myLoader lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>}
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1 className="text-center">Вхід</h1>
                    <Formik
                        initialValues = {initialValues}
                        onSubmit={onLoginSubmit}
                        validationSchema={loginValidation}
                    >
                        <Form>
                            <FormTextInput 
                            label="Електронна пошта"
                            id="email" 
                            name="email"
                            type="text"/>
                            <FormTextInput 
                            label="Пароль"
                            id="password" 
                            name="password"
                            type="password"/>

                            <input type="submit" className="btn btn-success mt-3" value="Війти"/>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div> 
    );
}

export default Login;