import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './../../../css/style.css';
import classNames from "classnames";

const FormTextPhotoInput = ({label, reference, ...props}) => {
    const [src, setSrc] = useState("https://bytes.ua/wp-content/uploads/2017/08/no-image.png");

    var drag = useSelector(redux => redux.drag);

    var dispatch = useDispatch();

    const dragIn = (e) => 
    {
        e.preventDefault();
        dispatch({type: "IN"});
    }

    const dragOut = (e) => 
    {
        e.preventDefault();
        dispatch({type: "OUT"});
    }

    const onChangeFileHandler = (e) => {
        e.preventDefault();
        dispatch({type: "OUT"});
        var file;
        if(e.target.files) 
        {
            file = e.target.files[0];
        }else if(e.dataTransfer) 
        {
            file = e.dataTransfer.files[0];
        }

        if(file !== 'undefined') 
        {
            var source = URL.createObjectURL(file);
            setSrc(source);
            
            reference.current.setFieldValue(props.id, file);
        }
    }

    return (
        <>
            <h5 className="text-center">Добавте фотографію</h5>
            <div className="container-fluid mt-3 d-flex justify-content-center">


                <label htmlFor={props.id || props.name}>
                    <div className="form-group">
                        <div
                            className={classNames("mt-3", "mb-3",
                                { "dragIn": (drag.drag === "in") }, { "dragOut": (drag.drag === "out") }
                            )}
                            onDragEnter={dragIn}
                            onDragOver={dragIn}
                            onDragLeave={dragOut}
                            onDrop={onChangeFileHandler}
                        >
                            <img width="200" height="200" className="m-3" src={src} />
                        </div>

                    </div>
                </label>

                <input type="file"
                    className="d-none"
                    name={props.name}
                    id={props.id}
                    onChange={onChangeFileHandler} />
            </div>
        </>
    );
}

export default FormTextPhotoInput;