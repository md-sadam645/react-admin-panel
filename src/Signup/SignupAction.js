import axios from "axios";
import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR
} from "./SignupState";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

const signupRequest =(formData)=>{
    return async (dispatch)=>{
        try{
            dispatch({
                type : SIGNUP_REQUEST,
                payload : []
            });
            const response = await axios({
                method : "post",
                url : "register",
                data : formData
            });
            dispatch({
                type : SIGNUP_SUCCESS,
                payload : response.data
            });
        }
        catch(err)
        {
            dispatch({
                type : SIGNUP_ERROR,
                error : err.response.data
            });
        }
    }
}

export {
    signupRequest
}