import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from "redux-logger";
import thunk from "redux-thunk";
import SignupReducer from './Signup/SignupReducer';
import LoginReducer from './Login/LoginReducer';
import ForgotReducer from './Forgot/ForgotReducer';
import RevenueReducer from './Admin/Dashboard/Modern/RevenueUpdates/RevenueReducer';
import NotesReducer from './Admin/App/Notes/NotesReducer';

const middlewares = applyMiddleware(
    thunk,
    logger
);

const root = combineReducers({
    SignupReducer,
    LoginReducer,
    ForgotReducer,
    RevenueReducer,
    NotesReducer
});

const storage = createStore(root,{},middlewares);

export default storage;