import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import {connectRouter, routerMiddleware } from "connected-react-router";
import {createBrowserHistory} from 'history';
import dragReducer from "./reducers/dragReducer";
import LoaderReducer from "./reducers/loaderReducer";
import usersReducer from "./reducers/usersReducer";


var dataHistory = document.getElementsByTagName('base')[0].getAttribute('href');
export const history = createBrowserHistory({basename: dataHistory});

var middleware = [thunk,
routerMiddleware(history)];

var rootReducer = combineReducers({
    auth: authReducer,
    router: connectRouter(history),
    drag: dragReducer,
    loader: LoaderReducer,
    users: usersReducer
});

var settings = [];
var isDevelopment = process.env.NODE_ENV === 'development';
if(isDevelopment && window !== 'undefined' && window.devToolsExtension) 
{
    window.devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
    settings.push(window.devToolsExtension());
}

var store = createStore(rootReducer, 
    {}, compose(applyMiddleware(...middleware), ...settings));

export default store;