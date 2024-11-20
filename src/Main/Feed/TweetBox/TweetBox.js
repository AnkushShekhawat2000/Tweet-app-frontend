import {useState} from "react"
import { Avatar, Button } from "@mui/material";
import  AddPhotoAlternateOutlinedIcon  from "@mui/icons-material/AddPhotoAlternateOutlined";
import axios from "axios";
import "./TweetBox.css"
import {useUserauth} from "../../../context/UserAuthContext"
import useLoggedInUser from "../../../hooks/useLoggedInUser";


const TweetBox = () =>{

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [post, setPost] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [isLoading, setIsLoading] = useState('');
    const {user} =  useUserauth();
    const [loggedInUser] = useLoggedInUser();
    const email = user?.email
    const userProfilepic =  loggedInUser[0] ?.profileImage 
    ? loggedInUser[0].profileImage
    : user && user.photoURL ;
    
      function handleUploadImage(e){

        setIsLoading(true);
        const image = e.target.files[0];
        const formData = new FormData();
        formData.set("image", image);
        axios.post(`https://api.imgbb.com/1/upload?key=22741e46a20f61109c000473abeaac5b`, formData)
        .then(res => {
          setImageURL(res.data.data.display_url);
          console.log(res.data.data.display_url);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        })
        
      }


      function handleTweet(e){
          e.preventDefault();

          if(user?.providerData[0]?.provideId === "password"){
            fetch(`http://localhost:3500/loggedInUser?email=${email}`)
            .then(res => res.json())
            .then(data => {
              console.log('from useLoggedinuser', data)
              setName(data[0]?.name)
              setUsername(data[0]?.username)
            })
          } else{

            console.log(user);
            console.log("elese vhla");
            setName(user?.displayName);
            setUsername(email?.split("@")[0]);
          }


          console.log(name, username);


          if(name){
            const userPost = {
              profile: userProfilepic,
              postBody: post,
              postImage: imageURL,
              username: username,
              name: name,
              email: email,
            }
          

          setPost("");
          setImageURL("");

          fetch(`http://localhost:3500/create-post`,{
            method: "POST",
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(userPost)
          })  
          .then(res => res.json())
          .then(data => {
            console.log(data);
          })


          

        }
      }  
        
    

    return (

        <div className="tweetBox">
           <form onSubmit={handleTweet}>
             <div className="tweetBox-input">
                <Avatar src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577900_960_720.png"/>
                <input 
                type="text"
                placeholder="What's happening?"
                onChange={(e)=>setPost(e.target.value)}
                value={post}
                required
                />
             </div>
             <div className="imageIcon-tweetButton">
               <label htmlFor="image" className="imageIcon">
                   {
                    isLoading ? <p>Uploading Image</p> : <p>{imageURL ? 'image uploaded' :  <AddPhotoAlternateOutlinedIcon/>}</p>
                   }
               </label>
               <input 
                 type="file"
                 id='image'
                 className="imageInput"
                 onChange={handleUploadImage}
               />
             <Button className="tweetBox-tweetButton" type="submit">Tweet</Button>
             </div>
           </form>
        </div>
    )
}

export default TweetBox