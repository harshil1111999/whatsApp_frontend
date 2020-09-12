import React, { useState, useEffect, useRef } from 'react'
import Home from './components/Home'
import axios from "./axios";
import { useForm } from "react-hook-form"
import './app.css'
import { Base64 } from 'js-base64';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

    const [user, setUser] = useState({})
    const { register, errors, handleSubmit, watch } = useForm();
    const [clicked, setClicked] = useState('signup')

    const password = useRef({});
    password.current = watch("password", "");

    const isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    useEffect(() => {
        if(!isEmpty(localStorage.getItem('user'))) {
            axios.get(`/user/${localStorage.getItem('user')}`)
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
        }
    },[])

    const onSubmit = async (value) => {
        const temp = { number: value.number, 
            password: Base64.encode(value.password)}
        let res
        if(clicked === "signup") {
            temp.name = value.name
            res = await axios.post('/signup', temp)
        }
        else {
            res = await axios.post('/login', temp)
        }
        if(res.data === "Please enter correct password!") {
            toast.error("Please enter correct password!")
        } else {
            setUser(res.data)
            localStorage.setItem('user', res.data.number)
            toast.info("You have successfully loged in!")
        }
    }

    if(!isEmpty(user)) {
        return <Home setUser={setUser} user={user}/>
    }

    return (
        <div className="container">
            <div className="box" style={{margin: "20px"}}>
                {/* header */}
                <div className="is-flex" style={{alignItems: "center", justifyContent: "center"}}>
                    <div id="logo" className="is-flex" style={{alignItems: "center", justifyContent: "center", marginRight: "20px"}}>
                        <img src="logo.png" width="50px" height="50px" alt="logo"/>
                    </div>
                    <h1 className="title" style={{fontSize: "50px", textAlign: "center"}}>Welcome to the Chit-Chat!</h1>
                </div>
            </div>
            <div className="box is-flex" style={{margin: "20px", flexDirection: "column", alignItems: "center"}}>
                {
                    clicked === "signup" ? (
                        <div className="is-flex header" style={{width: "80%"}}>
                            <button id="signup" onClick={() => setClicked("signup")} style={{display: "flex", flex: 1, 
                            fontSize: "40px", borderWidth: "0px", borderRight: "2px solid lightgray", cursor: "pointer",
                             outline: "none", justifyContent: "center", 
                             alignItems: "center", transform: "scale(0.98)", 
                             boxShadow: "3px 2px 22px 1px rgba(0, 0, 0, 0.24)" }}>Signup</button>
                            <button id="login" onClick={() => setClicked("login")} style={{display: "flex", flex: 1, 
                            fontSize: "40px", border: "none", justifyContent: "center", outline: "none", 
                            cursor: "pointer", alignItems: "center"}}>Login</button>
                        </div>
                    ) : (
                        <div className="is-flex header" style={{width: "80%"}}>
                            <button id="signup" onClick={() => setClicked("signup")} style={{display: "flex", flex: 1, 
                            fontSize: "40px", borderWidth: "0px", borderRight: "2px solid lightgray", 
                            cursor: "pointer", outline: "none", justifyContent: "center", 
                            alignItems: "center"}}>Signup</button>
                            <button id="login" onClick={() => setClicked("login")} style={{display: "flex", flex: 1, 
                            fontSize: "40px", border: "none", justifyContent: "center", outline: "none", 
                            cursor: "pointer", alignItems: "center", transform: "scale(0.98)",
                            boxShadow: "3px 2px 22px 1px rgba(0, 0, 0, 0.24)" }}>Login</button>
                        </div>
                    )
                }
                <div className="is-flex form" style={{flexDirection: "column", marginTop: "40px", alignItems: "center", width: "50%"}}>
                    <form onSubmit={handleSubmit(onSubmit)} style={{width: "100%"}}>
                        <div className="is-flex" style={{flexDirection: "column"}}>
                            {/* name */}
                            {
                                clicked === "signup" ? (
                                    <div className="field">
                                        <label className="label">Name</label>
                                        <div className="control has-icons-left has-icons-right">
                                            <input className="input"
                                                type="text"
                                                id="name"
                                                name="name"
                                                aria-invalid={errors.name ? "true" : "false"}
                                                ref={register({ required: "Name is required", 
                                                                maxLength: {
                                                                    value: 30,
                                                                    message: "Max length exceeded"
                                                                } })}
                                            />
                                            <span className="icon is-small is-left">
                                                <i className="fa fa-user" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        {errors.name && <p className="help is-danger"><span style={{color: "red"}}>*</span>{errors.name.message}</p>}
                                    </div>
                                ) : ""
                            }

                            {/* number */}
                            <div className="field">
                                <label className="label">Number</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input className="input"
                                        type="tel"
                                        id="number"
                                        name="number"
                                        aria-invalid={errors.number ? "true" : "false"}
                                        ref={register({ required: "Number is required",
                                                        maxLength: {
                                                            value: 10,
                                                            message: "Number should be of 10 digits"
                                                        },
                                                        minLength: {
                                                            value: 10,
                                                            message: "Number should be of 10 digits"
                                                        },
                                                        validate: value => value.match(/[0-9]/) || "Number shoud not contain any character"
                                                    })}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fa fa-mobile" aria-hidden="true"></i>
                                    </span>
                                </div>
                                {errors.number && (
                                    <p className="help is-danger"><span style={{color: "red"}}>*</span>{errors.number.message}</p>
                                )}
                            </div>

                            {/* password */}
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input className="input"
                                        type="password"
                                        id="password"
                                        name="password"
                                        aria-invalid={errors.password ? "true" : "false"}
                                        ref={register({ required: "Password is required",
                                                        minLength: {
                                                            value: 8,
                                                            message: "Password must have at least 8 characters"
                                                        },
                                                        validate: value => value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
                                                         || "Password must contain atleast 1 capital letter, 1 special character and 1 digit"
                                                    })}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fa fa-key" aria-hidden="true"></i>
                                    </span>
                                </div>
                                {errors.password && (
                                    <p className="help is-danger"><span style={{color: "red"}}>*</span>{errors.password.message}</p>
                                )}
                            </div>
                            
                            {/* confirem password */}
                            {
                                clicked === "signup" ? (
                                    <div className="field">
                                        <label className="label">Confirm Passwrd</label>
                                        <div className="control has-icons-left has-icons-right">
                                            <input className="input"
                                                type="password"
                                                id="confirm_password"
                                                name="confirm_password"
                                                aria-invalid={errors.confirm_password ? "true" : "false"}
                                                ref={register({ required: "Confirm password is required",
                                                    minLength: {
                                                        value: 8,
                                                        message: "Password must have at least 8 characters"
                                                    },
                                                    validate: value => value === password.current || "The passwords do not match" })}
                                            />
                                            <span className="icon is-small is-left">
                                                <i className="fa fa-key" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        {/* {errors.confirm_password && errors.confirm_password.type === "required" && (
                                            <p className="help is-danger"><span style={{color: "red"}}>*</span>{errors.confirm_password.message}</p>
                                        )} */}
                                        {errors.confirm_password && <p className="help is-danger"><span style={{color: "red"}}>*</span>{errors.confirm_password.message}</p>}
                                    </div>
                                ) : ""
                            }
                        </div>
                        <div style={{marginTop: "20px", textAlign: "center"}}>
                            <button className="button is-link is-rounded is-outlined" style={{width: "40%"}}>
                                {
                                    clicked === "signup" ? "Signup" : "Login"
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer position="bottom-right"/>
        </div>
    )
}

export default App
