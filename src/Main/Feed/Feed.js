import React, {useState, useEffect} from 'react';
import TweetBox from "./TweetBox/TweetBox.js"
import Post from "./Posts/Posts.js"
import "./feed.css"
import twitterImg from "../../image/twitter.jpeg";


let i = 10;
const Feed = () =>{
    const [posts, setPosts] = useState([]);

    useEffect(()=> {
                                  //   console.log("ye call gye",i++);
      fetch("https://tweet-app-backend.onrender.com/get-all-posts")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPosts(data);
      }) 
    },[])
     


    return (
        <div className="feed">
            <div className="feed__header">
               
            </div>
            <TweetBox />
            <div className='post-container'>
            
            {
                posts.map(p => <Post key={p._id} p={p} />)
            }
            </div>
        </div>

    )
}

export default Feed