

import axios from "axios";
import { 
    EMAIL_SENDED, 
    FORGOT_REQUEST, 
    USER_NOT_FOUND,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD,
    INVALID_CODE
} from "./ForgotState";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

const forgotRequest =(e)=>{
    e.preventDefault();
    const email = e.target[0].value;

    return async (dispatch)=>{
        try{
            dispatch({
                type : FORGOT_REQUEST
            });

            const response = await axios({
                method : "POST",
                url : "forgot-password",
                data : {
                    email : email
                } 
            });
            
            dispatch({
                type : EMAIL_SENDED
            });
        }
        catch(err)
        {
            // console.log(err);
            dispatch({
                type : USER_NOT_FOUND
            });
        }
    }
}

const changePassword =(e,formData)=>{
    e.preventDefault();
  
    return async (dispatch)=>{
        try{
            dispatch({
                type : CHANGE_PASSWORD_REQUEST
            });

            const response = await axios({
                method : "post",
                url : "update-password",
                data : formData
            });
           
            dispatch({
                type : CHANGE_PASSWORD
            });
        }
        catch(err)
        {
            // console.log(err);
            dispatch({
                type : INVALID_CODE
            });
        }
    }
}

export {
    forgotRequest,
    changePassword
}