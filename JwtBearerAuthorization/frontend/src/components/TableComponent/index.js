import TableComponentItem from "./item";
import { useSelector, useDispatch } from "react-redux";
import axiosService from "../../services/axiosService";
import './../../css/loader.css';
import LoadAction from "../../actions/Load";
import { useEffect } from "react";

const TableComponent = () => 
{
    
    const loader = useSelector(redux => redux.loader);
    var userData = useSelector(redux => redux.auth);
    var dispatch = useDispatch();
    
    var users = useSelector(redux => redux.users);
    
    useEffect(() => {
        dispatch(LoadAction(users, userData));
    }, []);
    
    

    return (
        <div>
        {(userData.isAuth) ? 
        <div className="row">
            {loader.isLoad && <div className="ownmodal">
            <div className="myLoader lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>}
            <div className="offset-2 col-md-8">
            <table className="table table-striped table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                        <th scope="col">Номер</th>
                        <th scope="col">Ім'я</th>
                        <th scope="col">Прізвище</th>
                        <th scope="col">Номер телефону</th>
                        <th scope="col">Електронна пошта</th>
                        <th scope="col">Фотографія</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((element,index) => {
                            return (
                                <TableComponentItem
                                    key={'users' + index}
                                    id={(index+1)}
                                    firstname={element.firstname}
                                    lastname={element.lastname}
                                    phone={element.phoneOwn}
                                    email={element.email}
                                    image={element.image}
                                />
                            );
                            })}
                    </tbody>
                </table>
            </div>
        </div> : <></>
        }
        </div>
    );
}

export default TableComponent;