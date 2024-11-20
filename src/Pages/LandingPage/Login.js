import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import twitterImg from "../../image/twitter.jpeg";
import TwitterIcon from '@mui/icons-material/Twitter';
import { useUserauth } from "../../context/UserAuthContext";
import "./LandingPage.css"


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {googlesignin} = useUserauth();
    const {login} = useUserauth();
    // const [signInWithEmailAndPassword,user,loading,error] = useSignInWithEmailAndPassword(auth);
    // const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    // if(user || googleUser){
    //     navigate("/");
    //     console.log(user);
    //     console.log(googleUser);
    // }

    // if(user){
    //     console.log(user);
    // }

    // if(error){
    //     console.log(error.message);
    // }
    
    // if(loading){
    //     console.log("loading....");
    // }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try{
            await login(email, password);
            navigate("/");
        }
        catch(err){
            setError(err.message);
            window.alert(error);
        }

         

    //    console.log(email, password);
    //    signInWithEmailAndPassword(email, password);
    };

    const  handleGoogleSignIn = async(e) =>{
        e.preventDefault();
        try{
          await googlesignin();
          navigate("/");
        } catch(error){
          console.log(error.message);
        }
      }
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