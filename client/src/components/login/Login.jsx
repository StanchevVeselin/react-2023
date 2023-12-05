import { Link } from "react-router-dom";
import  {useForm}  from "../../hooks/useForm";
import "./login.css" 
import { useContext } from "react";
import AuthContext from "../../context/authData";

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
                    {/* <StorefrontIcon className="login__logoImage" fontSize="large" /> */}
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
                    // value={email} 
                    // onChange={e => setEmail(e.target.value)} 
                    onChange={onChange}
                    value={values.email}
                    />

                    <h5>Password</h5>
                    <input type='password' 
                    name="password"
                    // value={password} 
                    // onChange={e => setPassword(e.target.value)}
                    onChange={onChange}
                    value={values.password}
                     />

                    <button 
                    type='submit' 
                    className='login__signInButton' 
                    // onClick={signIn}
                    >Sign In
                    </button>
                </form>

                <p>
                    By signing-in you agree to the eShop Website Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button 
                className='login__registerButton' 
                // onClick={register}
                >Create your eShop Account</button>
            </div>
        </div>
    )
    
}
export default Login;