import
{
    Button,
    Typography,
    Grid,
    Stack,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox
} from "@mui/material";

import {Link} from "react-router-dom";
import MediaQuery from "react-responsive";
import { useEffect, useState} from "react";
import useHttp from "../Hooks/useHttp";
import SweetAlert from "react-bootstrap-sweetalert";
import Cookies from "universal-cookie";
import { 
    useSelector,
   useDispatch 
} from "react-redux";
import { signupRequest } from "./SignupAction";

import { LoadingButton } from "@mui/lab";

const Signup =()=>{
    const dispatch = useDispatch();
    const {SignupReducer} = useSelector(response=>response);

    const signupForm = {
        fullname : "",
        mobile : "",
        email : "",
        password : ""
    }

    const signupFormError = {
        fullname : {
            state : false,
            message : ""
        },
        mobile : {
            state : false,
            message : ""
        },
        email : {
            state : false,
            message : ""
        },
        password : {
            state : false,
            message : ""
        }
    }

    const cookie = new Cookies();
    const [input,setInput] = useState(signupForm);
    const [error,setError] = useState(signupFormError);
    const [checked,setChecked] = useState(false);
    const [sweetAlert,setSweetAlert] = useState({
        state : false,
        icon : "default",
        title : "",
        message : ""
    });


    useEffect(()=>{
        if(SignupReducer.error)
        {
            if(SignupReducer.error.error && SignupReducer.error.status == 2)
            {
                setSweetAlert({
                    state : true,
                    icon : "error",
                    title : "Signup Failed2",
                    message : SignupReducer.error.error
                });
            }

            if(SignupReducer.error && SignupReducer.error.status == 0)
            {
                setSweetAlert({
                    state : true,
                    icon : "error",
                    title : "Signup Failed",
                    message : SignupReducer.error.msg
                });
            }

            
        }

        

        if(SignupReducer.data)
        {
            cookie.set("authToken",SignupReducer.data.token,{maxAge : 86400});
            setSweetAlert({
                state : true,
                icon : "success",
                title : "Signup Success!",
                message : "Signup is completed!"
            });
        }
    },[SignupReducer]);

    const Alert=()=>{
        const alertDesign =(
            <>
                <SweetAlert
                    show={sweetAlert.state}
                    type={sweetAlert.icon}
                    title={sweetAlert.title}
                    customButtons={
                        <>
                            <Button sx={{py:1, mr:2}} onClick={()=>setSweetAlert({state:false})} color="warning" variant="contained">Cancel</Button>
                            <Button sx={{py:1}} color="success" variant="outlined" component={Link} to="/admin">Login</Button>
                        </>
                    }
                    onConfirm={()=>{}}
                >
                    {sweetAlert.message}
                </SweetAlert>
            </>
        )
        return alertDesign;
    }
  

    const fullnameValidation=(e)=>{
        const input = e.target;
        const key = input.name;
        const isRequired = required(input);
        return setError((oldData)=>{
            return {
                ...oldData,
                [key] : isRequired
            }
        })
    }

    const mobileValidation=(e)=>{
        const input = e.target;
        const key = input.name;
        const isRequired = required(input);
        const isMinLength = minLength(input,4);
        const isMaxLength = maxLength(input,13);
        return setError((oldData)=>{
            return {
                ...oldData,
                [key] : isRequired.state && isRequired || 
                isMinLength.state && isMinLength || 
                isMaxLength
            }
        })
    }

    const emailValidation=(e)=>{
        const input = e.target;
        const key = input.name;
        const isRequired = required(input);
        const isEmail = emailSyntax(input);
        return setError((oldData)=>{
            return {
                ...oldData,
                [key] : isRequired.state && isRequired || isEmail
            }
        })
    }

    const passwordValidation=(e)=>{
        const input = e.target;
        const key = input.name;
        const isRequired = required(input);
        const isStrongPassword = strongPassword(input);
        const isMinLength = minLength(input,8);
        const isMaxLength = maxLength(input,15);
        return setError((oldData)=>{
            return {
                ...oldData,
                [key] : isRequired.state && isRequired || 
                isStrongPassword.state && isStrongPassword || 
                isMinLength.state && isMinLength || 
                isMaxLength
            }
        })
    }

    const required=(input)=>{
        if(input.value.length === 0)
        {
            return {
                state : true,
                message : "This field is empty"
            }
        }
        else
        {
            return {
                state : false,
                message : ""
            }
        }
    }

    const emailSyntax=(input)=>{
        const regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        const value = input.value.trim();
        if(regExp.test(value))
        {
            return {
                state : false,
                message : ""
            }
        }
        else
        {
            return {
                state : true,
                message : "This email is not valid!"
            }
        }
    }

    const minLength=(input,requiredLength)=>{
        if(input.value.length < requiredLength)
        {
            return {
                state : true,
                message : `Minimum ${requiredLength} characters required!`
            }
        }
        else
        {
            return {
                state : false,
                message : ""
            }
        }
    }

    const maxLength=(input,requiredLength)=>{
        if(input.value.length > requiredLength)
        {
            return {
                state : true,
                message : `Maximum ${requiredLength} characters required!`
            }
        }
        else
        {
            return {
                state : false,
                message : ""
            }
        }
    }

    const strongPassword=(input)=>{
        const regExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=)/g;
        const value = input.value.trim();
        if(regExp.test(value))
        {
            return {
                state : false,
                message : ""
            }
        }
        else
        {
            return {
                state : true,
                message : "Password contain uppercase, lowercase, symbols & numbers!"
            }
        }
    }

    const updateValue =(e)=>{
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

    const validateOnSubmit=()=>{
        let valid = true;
        for(let key in input)
        {
            if(input[key].length === 0)
            {
                valid = false;
                setError((oldData)=>{
                    return {
                        ...oldData,
                        [key] : {
                            state : true,
                            message : "This field is required!"
                        }
                    }
                })
            }
        }
        return valid;
    }

    const register=(e)=>{
        e.preventDefault();
        const isValid = validateOnSubmit();
        if(isValid)
        {
            dispatch(signupRequest(input));
        }
    }

    const design =(
        <>
            <Grid container>
                <Grid item>
                    <MediaQuery minWidth={1224}>
                        <img src="images/auth.svg" width="100%" alt="auth" />
                    </MediaQuery>
                    <MediaQuery maxWidth={1224}>
                        <img src="images/mobile-auth.png" width="100%" alt="auth" />
                    </MediaQuery>
                </Grid>
                <Grid item sx={{px:5}}>
                    <Typography variant="h3" sx={{my:5}}>
                        Register
                    </Typography>
                    <form onSubmit={register}>
                        <Stack direction="column" spacing={3}>
                        
                            <TextField 
                            error={error.fullname.state}
                            helperText={error.fullname.message}
                            type="text" 
                            variant="outlined" 
                            label="Fullname" 
                            value={input.fullname}
                            name="fullname"
                            onChange={updateValue}
                            onBlur={fullnameValidation}
                            onInput={fullnameValidation}
                            />
                            
                            <TextField 
                            error={error.mobile.state}
                            helperText={error.mobile.message}
                            type="text" 
                            variant="outlined" 
                            label="Mobile"
                            value={input.mobile}
                            name="mobile"
                            onChange={updateValue}
                            onBlur={mobileValidation}
                            onInput={mobileValidation}
                            />

                            <TextField 
                            error={error.email.state}
                            helperText={error.email.message}
                            type="email" 
                            variant="outlined" 
                            label="Email"
                            value={input.email}
                            name="email"
                            onChange={updateValue}
                            onBlur={emailValidation}
                            onInput={emailValidation}
                            />

                            <TextField 
                            error={error.password.state}
                            helperText={error.password.message}
                            type="text" 
                            variant="outlined" 
                            label="Password"
                            value={input.password}
                            name="password"
                            onChange={updateValue}
                            onBlur={passwordValidation}
                            onInput={passwordValidation}
                            />
                            <Stack direction="row" justifyContent="space-between" alignContent="center">
                                <FormGroup>
                                    <FormControlLabel 
                                    label="I accept terms & conditions"
                                    control={<Checkbox color="warning" />}
                                    onClick={()=>setChecked(!checked)}
                                    />
                                </FormGroup>

                                <Button 
                                type="button" 
                                component={Link} to="login"
                                >I Already have an account</Button>
                            </Stack>
                            <div>
                                <LoadingButton loading={SignupReducer.isLoader} 
                                disabled={
                                    error.fullname.state || 
                                    error.mobile.state || 
                                    error.email.state || 
                                    error.fullname.password || 
                                    !checked
                                }
                                type="submit"  
                                sx={{py:1}} 
                                variant="contained"
                                >Signup</LoadingButton>
                            </div>
                        <Alert />
                        </Stack>
                    </form>
                </Grid>
            </Grid>
        </>
    );
    return design;
}
export default Signup;