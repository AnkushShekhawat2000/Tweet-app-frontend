import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox/TweetBox.js";
import Post from "./Posts/Posts.js";
import "./feed.css";
import twitterImg from "../../image/twitter.jpeg";
import useLoggedInUser from "../../hooks/useLoggedInUser.js";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loggedInUser] = useLoggedInUser();
  
  async function fetchPost() {
  
    fetch(`${process.env.REACT_APP_BASE_URL}/get-all-posts`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  }

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete this post?");
      if (!confirmDelete) return;

      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/delete-post/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loggedInUser?.email,
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setPosts((prev) => prev.filter((post) => post._id !== id));
      } else {
        alert(data.message || "Failed to delete post");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong");
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);

  const handleUpdate = async (updatedPost) => {
    
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/edit-post/${updatedPost._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loggedInUser?.email, // 🔐 security
            postBody: updatedPost.postBody,
            postImage: updatedPost.postImage,
          }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        setPosts((prev) =>
          prev.map((post) => (post._id === updatedPost._id ? data.post : post)),
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="feed">
      <div className="feed__header"></div>
      <TweetBox fetchPost={fetchPost} />
      <div className="post-container">
        {posts.map((p) => (
          <Post
            key={p._id}
            p={p}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
