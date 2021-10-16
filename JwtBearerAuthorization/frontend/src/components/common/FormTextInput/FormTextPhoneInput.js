import { useField } from "formik";
import classNames from 'classnames';
import { useState } from "react";
import { useIMask } from 'react-imask';

const FormTextPhoneInput = ({label, ...props}) => {

    const [field, meta] = useField(props);

    const [opts, setOpts] = useState({mask: '+00(000) 000 00 00'});
    const {ref, maskRef}= useIMask(opts);

    return(
        <div className="form-group">
            <label htmlFor={props.id || props.name} className="form-label">{label}</label>
            <input className={classNames("form-control", {"is-invalid":(meta.error && meta.touched)},
                {"is-valid": (!meta.error && meta.touched)})} ref={ref} {...props} {...field}/>

            {(meta.touched && meta.error) && <div className="invalid-feedback">
                    {meta.error}
                </div>}
        </div>
    );
}

export default FormTextPhoneInput;