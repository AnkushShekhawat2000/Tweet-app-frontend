import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import twitterImg from "../../image/twitter.jpeg";
import TwitterIcon from '@mui/icons-material/Twitter';
import { useUserauth } from "../../context/UserAuthContext";
import "./LandingPage.css"
import auth from "../../firebase.init"


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {googlesignin} = useUserauth();
    const {login} = useUserauth();

    console.log("data => ", email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try{
                                 // console.log(email, password);
            await login(email, password);
                                  // console.log("Login Successful");
            navigate("/");
        }
        catch(err){
            setError(err.message);
            window.alert(error);
        }

    };

   
const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider(); // Initialize Google Auth Provider
  
    try {
      const result = await signInWithPopup(auth, provider); // Google Sign-In
      // Navigate to the dashboard
      navigate("/");
    } catch (error) {
      console.log("Google Sign-In Error:", error.message);
    }
  };
  
    return (
        <>
            <div className="login-container">
                <div className="image-container">
                    <img className=" image" src={twitterImg} alt="twitterImage" />
                </div>

                <div className="form-container">
                    <div className="form-box" >
                        <TwitterIcon style={{ color: "skyblue" }} />
                        <h2 className="heading">Happening now</h2>

                        <form onSubmit={handleSubmit}>

                            <input
                                type="email" className="email"
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                            />



                            <input className="password"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />


                            <div className="btn-login">
                                <button type="submit" className="btn" >Log In</button>
                            </div>
                        </form>
                        <hr />
                        <div className="google-button">
                            <GoogleButton
                                className="g-btn"
                                type="light" 
                                onClick={handleGoogleSignIn} 
                            />
                        </div>
                    </div>
                    <div>
                        Don't have an account?
                        <Link to="/signup"
                            style={{
                                textDecoration: 'none',
                                color: 'var(--twitter-color)',
                                fontWeight: '600',
                                marginLeft: '5px'
                            }}
                        >
                            Sign up
                        </Link>
                    </div>

                </div>


            </div>


        </>
    );
};

export default Login;