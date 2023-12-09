import { Link } from "react-router-dom";
import { useContext } from "react";

import  {useForm}  from "../../hooks/useForm";
import AuthContext from "../../context/authData";

import "./login.css" 

const Login = () => {
    const {loginHandler} = useContext(AuthContext)

    const {values,onChange,onSubmit} = useForm(loginHandler,{
        email: "",
        password: ""
    })

    return (
        <div className='login'> 
            <Link to='/login'
             style={{ textDecoration: "none" }}>
                <div className="login__logo">
                    <h2 className="login__logoTitle">eSHOP</h2>
                </div>
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form id="form-login" onSubmit={onSubmit}>
                    <h5>E-mail</h5>
                    <input 
                    type='text' 
                    name="email"
                    onChange={onChange}
                    value={values.email}
                    />

                    <h5>Password</h5>
                    <input type='password' 
                    name="password"
                    onChange={onChange}
                    value={values.password}
                     />

                    <button 
                    type='submit' 
                    className='login__signInButton' 
                    >Sign In
                    </button>
                </form>

                <p>
                    By signing-in you agree to the eShop Website Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button className='login__registerButton'>
                        <Link to='/register' style={{ textDecoration: "none", color: "inherit" }}>
                            Create your eShop Account
                        </Link>
                </button>
            </div>
        </div>
    )
    
}
export default Login;