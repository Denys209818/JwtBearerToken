import { useField } from "formik";
import classNames from 'classnames';

const FormTextInput = ({label, ...props}) => {

    const [field, meta] = useField(props);

    return(
        <div className="form-group">
            <label htmlFor={props.id || props.name} className="form-label">{label}</label>
            <input className={classNames("form-control", {"is-invalid":(meta.error && meta.touched)},
                {"is-valid": (!meta.error && meta.touched)})} {...props} {...field}/>

            {(meta.touched && meta.error) && <div className="invalid-feedback">
                    {meta.error}
                </div>}
        </div>
    );
}

export default FormTextInput;