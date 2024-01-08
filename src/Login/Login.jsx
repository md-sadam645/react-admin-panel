import 
{
    Grid,
    Stack,
    Button,
    Container,
    TextField,
    FormControl,
    FormControlLabel,
    Checkbox,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    IconButton,
    endAdornment
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { loginRequest } from "./LoginAction";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { LoadingButton } from "@mui/lab";

const Login =()=>{
    const cookie = new Cookies();
    const dispatch = useDispatch();
    const [type, setType] = useState("password");
    const [remember,setRemember] = useState(false);
    const {LoginReducer} = useSelector(response=>response);
    const navigate = useNavigate();

    const checkForLogin=()=>{
        if(LoginReducer.userNotFound)
        {
            return setError((oldData)=>{
                return {
                    ...oldData,
                    username : {
                        state : true,
                        msg : "User Doesn't Exists!"
                    },
                    password : {
                        state : false,
                        msg : ""
                    }
                }
            });
        }

        if(LoginReducer.incorrectPassword)
        {
            return setError((oldData)=>{
                return {
                    ...oldData,
                    username : {
                        state : false,
                        msg : ""
                    },
                    password : {
                        state : true,
                        msg : "Incorrect Password!"
                    }
                }
            });
        }

        if(LoginReducer.isLogged)
        {
            cookie.set("authToken",LoginReducer.data.token,{maxAge:84600});
            return navigate("/admin");
        }
    }

    const rememberMe =()=>{
        let checkUser =  localStorage.getItem("user");
        if(checkUser)
        {
            let user = JSON.parse(checkUser);
            return(
                setInput(user),
                setRemember(true),
                setDisabled(false)
            );
        }
    }

    useEffect(()=>
    {
        checkForLogin();
        rememberMe();
    },[LoginReducer]);

    const [disabled,setDisabled] = useState(true);
    const [error,setError] = useState({
        username : {
            state : false,
            msg : ""
        },
        password : {
            state : false,
            msg : ""
        }
    });

    const [input,setInput] = useState({
        username : "",
        password : ""
    });

    const handleInput =(e)=>{
        const input = e.target;
        const key = input.name;
        const value = input.value;
        return setInput((oldData)=>{
            return {
                ...oldData,
                [key] : value
            }
        });
    }

    const schema = yup.object().shape({
        username : yup.string().required().email(),
        password : yup.string().required()
    }); 

    const validateInput = async (e)=>{
        const key = e.target.name;
        try{
            await schema.validateAt(key,input);
            return setError((oldData)=>{
                return {
                    ...oldData,
                    [key] : {
                        state : false,
                        msg : ""
                    }
                }
            });
        }
        catch(err)
        {
            let msg = err.errors[0];
            return setError((oldData)=>{
                return {
                    ...oldData,
                    [key] : {
                        state : true,
                        msg : msg
                    }
                }
            });
        }
    }

    const validatedSubmit = async ()=>{
        const isValid = await schema.isValid(input);
        return setDisabled(!isValid);
    }

    const login = (e)=>{
        e.preventDefault();
        if(remember)
        {
            let tmp = JSON.stringify(input);
            localStorage.setItem("user",tmp);
        }
        dispatch(loginRequest(input));
    }

    const design =(
        <>
            <Container>
                <Grid container>
                    <Grid  xs={12} sm={6}>
                        <h1>One</h1>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form onSubmit={login}>
                            <Stack direction="column" spacing={3}>
                                <h1>Login</h1>
                                <TextField 
                                error={error.username.state}
                                helperText={error.username.msg}
                                label="Username" 
                                variant="outlined" 
                                name="username"
                                value={input.username}
                                onChange={handleInput}
                                onKeyDown={validatedSubmit}
                                onInput={validateInput}
                                />

                                <FormControl>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput 
                                error={error.password.state}
                                helperText={error.password.msg}
                                label="Password" 
                                variant="outlined" 
                                type={type}
                                name="password"
                                value={input.password}
                                onChange={handleInput}
                                onKeyDown={validatedSubmit}
                                onInput={validateInput}
                                endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        onClick={()=>type === "password" ? setType("text") : setType("password")}
                                      >
                                        <span className="material-icons-outlined">
                                            {type === "password" ? "visibility" : "visibility_off"}
                                        </span>
                                    
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                />
                                </FormControl>

                                <Stack direction="row" justifyContent="end">
                                    <a href="/forget-password" >Forget Password ?</a>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <FormControl>
                                        <FormControlLabel control={<Checkbox onChange={()=>setRemember(!remember)} checked={remember} />} label="Remember Me" />
                                    </FormControl>
                                    <LoadingButton loading={LoginReducer.isLoading} disabled={disabled} type="submit" variant="contained" color="secondary" sx={{px:3,py:1}}>Login</LoadingButton>
                                </Stack>
                            </Stack>
                            <Link to="/">Create and Account</Link>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
    return design;
}
export default Login;