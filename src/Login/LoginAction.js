import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    USER_NOT_FOUND,
    INCORRECT_PASSWORD,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED
} from "./LoginState";

import Cookies  from "universal-cookie";

import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

const loginRequest =(userData)=>{
    return async (dispatch)=>
    {
        try
        {
            dispatch({
                type : LOGIN_REQUEST,
                payload : []
            });

            const response = await axios({
                method : "POST",
                url : "login",
                data : userData
            });
            
            console.log(response.data);
            dispatch({
                type : LOGIN_SUCCESS,
                payload : response.data
            });
        }
        catch(err)
        {
            if(err.response.status == 404)
            {
                dispatch({
                    type : USER_NOT_FOUND
                })
            }
            else
            {
                dispatch({
                    type : INCORRECT_PASSWORD
                })
            }
        }
    };
}

const logoutRequest = ()=>{
    const cookie = new Cookies();
    return (dispatch)=>{
        try
        {
            sessionStorage.clear();
            cookie.remove("authToken");
            cookie.remove("userVerified");
            dispatch({
                type : LOGOUT_SUCCESS
            })
        }
        catch(err)
        {
            dispatch({
                type : LOGOUT_FAILED
            })
        }
    }
}

export {
    loginRequest,
    logoutRequest
};