// import React, { useState, useEffect } from "react";
// import TweetBox from "./TweetBox/TweetBox.js";
// import Post from "./Posts/Posts.js";
// import "./feed.css";
// import twitterImg from "../../image/twitter.jpeg";
// import useLoggedInUser from "../../hooks/useLoggedInUser.js";

// const Feed = () => {
//   const [posts, setPosts] = useState([]);
//   const [loggedInUser] = useLoggedInUser();


//   async function fetchPost() {
//     if (!loggedInUser?._id) {
//       console.log("User Id not available yet");
//       return;
//     }

//   fetch(`${process.env.REACT_APP_BASE_URL}/get-all-posts`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       userId: loggedInUser?._id,
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       setPosts(data);
//     });
// }




//   const handleDelete = async (id) => {
//     try {
//       const confirmDelete = window.confirm("Delete this post?");
//       if (!confirmDelete) return;

//       const res = await fetch(`${process.env.REACT_APP_BASE_URL}/delete-post/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: loggedInUser?.email,
//         }),
//       });

//       const data = await res.json();

//       if (res.status === 200) {
//         setPosts((prev) => prev.filter((post) => post._id !== id));
//       } else {
//         alert(data.message || "Failed to delete post");
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//       alert("Something went wrong");
//     }
//   };


//   useEffect(() => {
//   if (!loggedInUser?._id) return;

//   fetchPost();
// }, [loggedInUser]);


//   const handleUpdate = async (updatedPost) => {
    
//     try {
//       const res = await fetch(
//         `${process.env.REACT_APP_BASE_URL}/edit-post/${updatedPost._id}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: loggedInUser?.email, // 🔐 security
//             postBody: updatedPost.postBody,
//             postImage: updatedPost.postImage,
//           }),
//         },
//       );

//       const data = await res.json();

//       if (res.ok) {
//         setPosts((prev) =>
//           prev.map((post) => (post._id === updatedPost._id ? data.post : post)),
//         );
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("Update error:", error);
//     }
//   };

//   return (
//     <div className="feed">
//       <div className="feed__header"></div>
//       <TweetBox fetchPost={fetchPost} />
//       <div className="post-container">
//         {posts.length > 0 && posts.map((p) => (
//           <Post
//             key={p._id}
//             p={p}
//             onDelete={handleDelete}
//             onUpdate={handleUpdate}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Feed;






import React, { useState, useEffect, useRef, useCallback } from "react";
import TweetBox from "./TweetBox/TweetBox.js";
import Post from "./Posts/Posts.js";
import "./feed.css";
import useLoggedInUser from "../../hooks/useLoggedInUser.js";

const LIMIT = 5;

const Feed = () => {

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [hasMore, setHasMore] = useState(true);

  const [loggedInUser] = useLoggedInUser();

  const observer = useRef();

  // ================= FETCH POSTS =================

  const fetchPost = async (pageNumber = 1, reset = false) => {

    if (!loggedInUser?._id || loading) return;

    try {

      setLoading(true);

      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/get-all-posts?page=${pageNumber}&limit=${LIMIT}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: loggedInUser?._id,
          }),
        }
      );

      const data = await res.json();

      if (reset) {

        setPosts(data);

      } else {

        setPosts((prev) => [...prev, ...data]);

      }

      // CHECK MORE POSTS

      if (data.length < LIMIT) {

        setHasMore(false);

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // ================= FIRST LOAD =================

  useEffect(() => {

    if (!loggedInUser?._id) return;

    setPosts([]);

    setPage(1);

    setHasMore(true);

    fetchPost(1, true);

  }, [loggedInUser]);

  // ================= LOAD MORE =================

  useEffect(() => {

    if (page === 1) return;

    fetchPost(page);

  }, [page]);

  // ================= OBSERVER =================

  const lastPostRef = useCallback(

    (node) => {

      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {

        if (entries[0].isIntersecting && hasMore) {

          setPage((prev) => prev + 1);

        }

      });

      if (node) observer.current.observe(node);

    },

    [loading, hasMore]
  );

  // ================= DELETE =================

  const handleDelete = async (id) => {

    try {

      const confirmDelete = window.confirm("Delete this post?");

      if (!confirmDelete) return;

      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/delete-post/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loggedInUser?.email,
          }),
        }
      );

      const data = await res.json();

      if (res.status === 200) {

        setPosts((prev) =>
          prev.filter((post) => post._id !== id)
        );

      } else {

        alert(data.message || "Failed to delete post");

      }

    } catch (error) {

      console.error("Delete error:", error);

    }

  };

  // ================= UPDATE =================

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
            email: loggedInUser?.email,
            postBody: updatedPost.postBody,
            postImage: updatedPost.postImage,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {

        setPosts((prev) =>
          prev.map((post) =>
            post._id === updatedPost._id
              ? data.post
              : post
          )
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

      <TweetBox fetchPost={() => fetchPost(1, true)} />

      <div className="post-container">

        {posts.map((p, index) => {

          // LAST POST

          if (posts.length === index + 1) {

            return (

              <div ref={lastPostRef} key={p._id}>

                <Post
                  p={p}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />

              </div>

            );

          }

          return (

            <Post
              key={p._id}
              p={p}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />

          );

        })}

      </div>

    
    {loading && (

      <div className="feed-loader">

        <div className="blue-loader"></div>

      </div>

    )}

    </div>

  );

};

export default Feed;