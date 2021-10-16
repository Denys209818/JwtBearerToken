import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutUser from "../../actions/Login/Logout";
import axiosService from "../../services/axiosService";

const Navbar = () => {
    var auth = useSelector(redux => redux.auth);
    var dispatch = useDispatch();
    const onClickHandler = () => 
    {
        dispatch(LogoutUser(auth));
        dispatch({type: "INIT", payload: []});
        dispatch(push("/login"));
    }

    const onClickHandle = () => 
    {
        dispatch({type: "INIT", payload: []});
    }

    return (
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand">JWT Authorization</a>
                <button className="navbar-toggler" data-bs-target="#mainMenu" data-bs-toggle="collapse">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainMenu">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">
                                Головна сторінка
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/test">
                                Тестова сторінка
                            </Link>
                        </li>
                    </ul>
                    {!auth.isAuth ? 
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Вхід
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={onClickHandle} to="/register">
                                    Реєстрація
                                </Link>
                            </li>
                        </ul>
                    :
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                    <span className="nav-link">Привіт, {auth.username}</span>
                            </li>
                            <li className="nav-item">
                                <span onClick={onClickHandler} className="nav-link" to="/logout">
                                    Вихід
                                </span>
                            </li>
                        </ul>
                    }
                    

                </div>
            </div>
        </nav>
    );
}

export default Navbar;