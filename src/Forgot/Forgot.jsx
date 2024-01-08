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

import { LoadingButton } from "@mui/lab";
import { useState, useEffect } from "react";
import { forgotRequest, changePassword } from "./ForgotAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Forgot=()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {ForgotReducer} = useSelector(response=>response);
    console.log(ForgotReducer);
    const [verifyForm,setVerifyForm] = useState(false);
    const [input,setInput] = useState({
        email : "",
        otp : "",
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
        })
    }

    const [error,setError] = useState({
        username : {
            state : false,
            msg : ""
        },
        code : {
            state : false,
            msg : ""
        }
    });

    const userCheck =()=>{
        if(ForgotReducer.success)
        {
            return setVerifyForm(true);
        }

        if(ForgotReducer.userNotFound)
        {
            return setError((oldData)=>{
                return {
                    ...oldData,
                    username : {
                        state : true,
                        msg : "User doesn't exists !"
                    }
                }
            });
        }
    }

    const checkForForgotPassword=()=>{
        if(ForgotReducer.changePassword)
        {
            return navigate("/login");
        }

        if(ForgotReducer.invalid_code)
        {
            return setError((oldData)=>{
                return {
                    ...oldData,
                    code : {
                        state : true,
                        msg : "Invalid Verification code !"
                    }
                }
            });
        }
    }

    useEffect(()=>{
        userCheck();
        checkForForgotPassword();
    },[ForgotReducer])

    const design=(
        <>
            <Container>
                <Grid container>
                    <Grid xs={12} sm={6}>
                        <h1>One</h1>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <h1>Forgot Password</h1>
                        {!verifyForm ? <form onSubmit={(e)=>dispatch(forgotRequest(e))}>
                            <Stack>
                                <TextField 
                                    error ={error.username.state}
                                    helperText = {error.username.msg}
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    sx={{mb : 3}}
                                    onChange={handleInput}
                                    value={input.email}
                                />
                                <div>
                                    <LoadingButton loading={ForgotReducer.isLoading} variant="contained" type="submit" color="primary">Forgot</LoadingButton>
                                </div>
                            </Stack>
                        </form>:

                        <form onSubmit={(e)=>dispatch(changePassword(e,input))}>
                            <Stack>
                                <TextField 
                                    error={error.code.state}
                                    helperText ={error.code.msg}
                                    name="otp"
                                    label="Verification Code"
                                    variant="outlined"
                                    type="number"
                                    sx={{mb : 3}}
                                    onChange={handleInput}
                                    value={input.code}
                                />
                                <TextField 
                                    name="password"
                                    label="New Password"
                                    variant="outlined"
                                    type="password"
                                    sx={{mb : 3}}
                                    onChange={handleInput}
                                    value={input.password}
                                />
                                <div>
                                    <LoadingButton loading={ForgotReducer.isLoading} variant="contained" type="submit" color="primary">Submit</LoadingButton>
                                </div>
                            </Stack>
                        </form>
                        }
                    </Grid>
                </Grid>
            </Container>
        </>
    );
    return design;
}

export default Forgot;