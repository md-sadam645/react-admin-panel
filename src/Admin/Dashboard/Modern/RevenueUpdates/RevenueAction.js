import {
    REVENUE_REQUEST,
    REVENUE_SUCCESS,
    REVENUE_FAILED
  } from "./RevenueState";
  
  import axios from "axios";
  axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
  
  const revenueRequest = ()=>{
    return async (dispatch)=>{
      try {
        dispatch({
          type: REVENUE_REQUEST
        });

        const response = await axios({
            method : "get",
            url : "revenue"
        });

        dispatch({
            type: REVENUE_SUCCESS,
            payload : response.data.data
          });
      }
      catch(err)
      {
        dispatch({
            type: REVENUE_FAILED
        });
      }
    }
  }
  
  export {
    revenueRequest
  }
  