import { Formik, Form } from "formik";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import RegisterAction from "../../actions/Register";
import axiosService from "../../services/axiosService";
import FormTextInput from "../common/FormTextInput";
import FormTextPhoneInput from "../common/FormTextInput/FormTextPhoneInput";
import FormTextPhotoInput from "../common/FormTextInput/FormTextPhotoInput";
import registerValidation from "./registerValidation";
import './../../css/loader.css';

const Register = () => {
    var initialValues = {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        password: '',
        submitPassword: '',
        image: null
    };

    var myRefFormik = useRef();
    var dispatch = useDispatch();

    var loader = useSelector(redux => redux.loader);
    var auth = useSelector(redux => redux.auth);

    const onSubmitHandler = (values) => 
    {
        dispatch(RegisterAction(values));
    }


    return (
        <div className="container">
            {loader.isLoad && <div className="ownmodal">
            <div className="myLoader lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>}
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1 className="text-center">Реєстрація</h1>
                <Formik
                innerRef={myRefFormik}
            initialValues={initialValues}
            validationSchema={registerValidation}
            onSubmit={onSubmitHandler}
        >
            <Form>
                <FormTextInput
                    label="Ім'я"
                    id="firstname"
                    name="firstname"
                    type="text"
                />
                <FormTextInput
                    label="Прізвище"
                    id="lastname"
                    name="lastname"
                    type="text"
                />
                <FormTextPhoneInput
                    label="Телефон"
                    id="phone"
                    name="phone"
                    type="text"
                />
                <FormTextInput
                    label="Електронна пошта"
                    id="email"
                    name="email"
                    type="text"
                />
                <FormTextInput
                    label="Пароль"
                    id="password"
                    name="password"
                    type="password"
                />
                <FormTextInput
                    label="Підтвердіть пароль"
                    id="submitPassword"
                    name="submitPassword"
                    type="password"
                />
                <FormTextPhotoInput
                    reference={myRefFormik}
                    id="image"
                    name="image"
                />
                <input type="submit" className="btn btn-success m-4" value="Зареєструватися"/>
            </Form>
        </Formik>
                </div>
            </div>
        </div>
    );
}

export default Register;