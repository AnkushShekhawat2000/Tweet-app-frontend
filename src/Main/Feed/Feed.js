import React, {useState, useEffect} from 'react';
import TweetBox from "./TweetBox/TweetBox.js"
import Post from "./Posts/Posts.js"
import "./feed.css"
import twitterImg from "../../image/twitter.jpeg";

const Feed = () =>{
    // const [posts, setPosts] = useState([]);
     
    const dummyPosts = [
      {
        _id: "1",
        name: "John Doe",
        username: "johndoe",
        photo: twitterImg,
        post: "Hello, World! This is my first tweet!",
        profilePhoto : twitterImg,
        likeCount: 10,
        commentCount: 5,
        retweetCount: 2
      },

      {
        _id: "2",
        name: "Jane Doe",
        username: "janedoe",
        photo: twitterImg,
        post: "Hello, World! This is my first tweet!",
        profilePhoto : twitterImg,
        likeCount: 8,
        commentCount: 3,
        retweetCount: 1
      },

      {
        _id: "3",
        name: "Mike Doe",
        username: "@mike Doe",
        photo: twitterImg,
        post: "Hello, World! This is my first tweet!",
        profilePhoto : twitterImg,
        likeCount: 15,
        commentCount: 7,
        retweetCount: 3
      }

    ]
    

    console.log("feed hited!");

    return (
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>
            <TweetBox />
            {
                dummyPosts.map(p => <Post key={p._id} p={p} />)
            }
        </div>

    )
}

export default Feed