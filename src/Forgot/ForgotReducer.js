import {
    EMAIL_SENDED,
    USER_NOT_FOUND,
    FORGOT_REQUEST,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD,
    INVALID_CODE
} from "./ForgotState";

const Modal ={
    isLoading : false,
    useNotFound : false,
    success : false,
    changePassword : false,
    invalidCode : false
}

const ForgotReducer =(state=Modal,action)=>{
    switch(action.type)
    {
        case FORGOT_REQUEST : return {
            ...state,
            isLoading : true,
            useNotFound : false,
            success : true,
            changePassword : false,
            invalidCode : false
        }

        case EMAIL_SENDED : return {
            ...state,
            isLoading : false,
            useNotFound : false,
            success : true,
            changePassword : false,
            invalidCode : false
        }

        case USER_NOT_FOUND : return {
            ...state,
            isLoading : false,
            useNotFound : true,
            success : true,
            changePassword : false,
            invalidCode : false
        }

        case CHANGE_PASSWORD_REQUEST : return {
            ...state,
            isLoading : true,
            useNotFound : false,
            success : true,
            changePassword : false,
            invalidCode : false
        }

        case CHANGE_PASSWORD : return {
            ...state,
            isLoading : false,
            useNotFound : false,
            success : true,
            changePassword : true,
            invalidCode : false
        }

        case INVALID_CODE : return {
            ...state,
            isLoading : false,
            useNotFound : false,
            success : true,
            changePassword : false,
            invalidCode : true
        }

        default : return state
    }
}

export default ForgotReducer;