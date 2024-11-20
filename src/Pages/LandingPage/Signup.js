import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import twitterimg from "../../image/twitter.jpeg";
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleButton from "react-google-button";
import {useUserauth} from "../../context/UserAuthContext"


import "./LandingPage.css"


const Signup = () => {

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const {signin}  = useUserauth();
    const {googlesignin} =useUserauth();

   const navigate = useNavigate();
 
    const handleSubmit = async (e) => {
       
      e.preventDefault();
      setError("");

    try{

            const user = {
            username: username,
            name: name,
            email: email,
            password:password,
            }


          const response = await fetch("http://localhost:3500/register" , {
            method : "POST",
            headers : {
                'content-type' : "application/json"
            },
            body : JSON.stringify(user),
           })

           if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || "something went wrong");
           }

           const data = await response.json();
           await signin(email, password);
           navigate("/");

        } catch(err){
          setError(err.message);
          window.alert(err.message);
        }
    
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
                    <img className="image" src={twitterimg} alt="twitterImage" />
                </div>


                <div className="form-container">
                    <div className="form-box">
                        <TwitterIcon className="Twittericon" style={{ color: "skyblue" }} />

                        <h2 className="heading">Happening now</h2>
                        <h3 className="heading1">Join twitter today</h3>

                        <div class="d-flex align-items-sm-center">
                            <h3 className="heading1"> Join twitter today </h3>
                        </div>


                       
                        <form onSubmit={handleSubmit}>

                            <input className="display-name" style={{ backgroudColor: "red" }}
                                type="username"
                                placeholder="@username "
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <input className="display-name" style={{ backgroudColor: "red" }}
                                type="name"
                                placeholder="Enter Full Name"
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input className="email"
                                type="email"
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                            />



                            <input className="password"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />


                            <div className="btn-login">
                                <button type="submit" className="btn">Sign Up</button>
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
                        <div>
                            Already have an account?
                            <Link to="/login"
                                style={{
                                    textDecoration: 'none',
                                    color: 'var(--twitter-color)',
                                    fontWeight: '600',
                                    marginLeft: '5px'
                                }}
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Signup;