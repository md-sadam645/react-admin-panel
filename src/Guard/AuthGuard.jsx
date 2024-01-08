import { useAsync } from "react-async";

import {
  Outlet,
  Navigate
} from "react-router";

import Cookies from "universal-cookie";
import axios from "axios";
import { useState } from "react";
axios.defaults.baseURL = "http://127.0.0.1:8000/api";

const verifyToken = async ()=>
{
    const cookie = new Cookies();
    const token = cookie.get("authToken");
  try {
    const response = await axios({
      method: "get",
      url: "/verify_token/"+token
    });

    if(response.data.msg == "verified user")
    { 
        let user = JSON.stringify(response.data.data);
        sessionStorage.setItem("user",user);
        cookie.set("userVerified","yes",{maxAge:86400});
    }
  }
  catch(err)
  {
    // throw new Error(err);
    cookie.set("userVerified","no",{maxAge:86400});
  }

  return false;
}

const AuthGuard = ()=>{
    const [render,setRender] = useState(true);
    const cookie = new Cookies();
 
    verifyToken();

    if(render)
    {
        
        const usrCookie = cookie.get("userVerified");
        if(usrCookie == "yes")
        {
            return <Outlet />;
        }
        else
        {
            return <Navigate to="/login" />
        }
    }

    return setRender(false);

}

export default AuthGuard;
