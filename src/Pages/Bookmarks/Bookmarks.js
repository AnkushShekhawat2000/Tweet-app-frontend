// // import React from 'react'
// // import "../Page.css"


// // function Bookmarks() {
// //     return (
// //         <div className="page">
// //         <h2 className="page_title">Welcome to Bookmarks</h2>
// //      </div>
// //     )
// // }

// // export default Bookmarks



// // import React, { useEffect, useState } from "react";
// // import "./Bookmarks.css";
// // import useLoggedInUser from "../../hooks/useLoggedInUser";

// // const Bookmarks = () => {
// //   const [bookmarks, setBookmarks] = useState([]);
// //   const [search, setSearch] = useState("");

// //   const [loggedInUser] = useLoggedInUser();
// //   const userId = loggedInUser?._id;
// //   const userEmail = loggedInUser?.email;

// // const getBookmarks = async () => {

// //   try {

// //     const res = await fetch(
// //       `${process.env.REACT_APP_BASE_URL}/get-bookmarked-posts`,
// //       {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           userId: loggedInUser._id,
// //         }),
// //       }
// //     );

// //     const data = await res.json();

// //     console.log(data.bookmarks);

// //     setBookmarks(data.bookmarks);

// //   } catch (error) {
// //     console.log(error);
// //   }
// // };
// //   useEffect(() => {
// //     if (userEmail) {
// //       getBookmarks();
// //     }
// //   }, [userId]);

// //   const filteredBookmarks = bookmarks.filter(
// //     (post) =>
// //       post.name?.toLowerCase().includes(search.toLowerCase()) ||
// //       post.username?.toLowerCase().includes(search.toLowerCase()) ||
// //       post.postBody?.toLowerCase().includes(search.toLowerCase()),
// //   );

// //   return (
// //     <div className="social-container">
// //       {/* Header */}
// //       <div className="social-header">
// //         <div>
// //           <h2>Bookmarks</h2>
// //           <p>Your saved posts collection</p>
// //         </div>

// //         <div className="flex-head">
// //           <input
// //             className="search-input"
// //             placeholder="Search bookmarks..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //           />
// //         </div>
// //       </div>

// //       {/* Empty State */}
// //       {filteredBookmarks.length === 0 ? (
// //         <div className="empty-bookmark">
// //           <img
// //             src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
// //             alt=""
// //           />

// //           <h3>No Bookmarks Found</h3>

// //           <p>Save posts to view them later.</p>
// //         </div>
// //       ) : (
// //         <div className="bookmark-grid">
// //           {filteredBookmarks.map((post) => (
// //             <div className="bookmark-card" key={post._id}>
// //               {/* Top */}
// //               <div className="bookmark-top">
// //                 <img
// //                   src={
// //                     post.profilePhoto ||
// //                     "https://i.ibb.co/4pDNDk1/avatar.png"
// //                   }
// //                   alt=""
// //                 />

// //                 <div>
// //                   <h4>{post.name}</h4>
// //                   <p>@{post.username}</p>
// //                 </div>
// //               </div>

// //               {/* Body */}
// //               <div className="bookmark-body">
// //                 <p>{post.postBody}</p>

// //                 {post.postImage && (
// //                   <img
// //                     className="bookmark-image"
// //                     src={post.postImage}
// //                     alt=""
// //                   />
// //                 )}
// //               </div>

// //               {/* Footer */}
// //               <div className="bookmark-footer">
// //                 <span>❤️ {post.likes?.length || 0}</span>

// //                 <span className="saved-tag">📌 Saved</span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Bookmarks;






// import React, { useEffect, useState } from "react";
// import { Avatar, IconButton, Tooltip } from "@mui/material";

// import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import RepeatIcon from "@mui/icons-material/Repeat";

// import useLoggedInUser from "../../hooks/useLoggedInUser";

// import "./Bookmarks.css";

// const Bookmarks = () => {
//   const [bookmarks, setBookmarks] = useState([]);
//   const [search, setSearch] = useState("");

//   const [loggedInUser] = useLoggedInUser();

//   // ================= GET BOOKMARKS =================

//   const getBookmarks = async () => {
//     try {
//       const res = await fetch(
//         `${process.env.REACT_APP_BASE_URL}/get-bookmarked-posts`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId: loggedInUser?._id,
//           }),
//         },
//       );

//       const data = await res.json();

//       setBookmarks(data.bookmarks || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (loggedInUser?._id) {
//       getBookmarks();
//     }
//   }, [loggedInUser]);

//   // ================= UNBOOKMARK =================

//   const handleUnbookmark = async (postId) => {
//     try {
//       const res = await fetch(
//         `${process.env.REACT_APP_BASE_URL}/unbookmark`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             postId,
//             userId: loggedInUser._id,
//           }),
//         },
//       );

//       if (res.ok) {
//         setBookmarks((prev) =>
//           prev.filter((post) => post._id !== postId),
//         );
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ================= SEARCH =================

//   const filteredBookmarks = (bookmarks || []).filter(
//     (post) =>
//       post.name?.toLowerCase().includes(search.toLowerCase()) ||
//       post.username?.toLowerCase().includes(search.toLowerCase()) ||
//       post.postBody?.toLowerCase().includes(search.toLowerCase()),
//   );

//   return (
//     <div className="social-container">
//       {/* Header */}

//       <div className="social-header">
//         <div>
//           <h2>Bookmarks</h2>
//           <p>Your saved posts collection</p>
//         </div>

//         <div className="flex-head">
//           <input
//             className="search-input"
//             placeholder="Search bookmarks..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Empty */}

//       {filteredBookmarks.length === 0 ? (
//         <div className="empty-bookmark">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
//             alt=""
//           />

//           <h2>No Bookmarks Yet</h2>

//           <p>Save posts to read later.</p>
//         </div>
//       ) : (
//         <div className="bookmark-grid">
//           {filteredBookmarks.map((post) => (
//             <div className="bookmark-post" key={post._id}>
//               {/* AVATAR */}

//               <div className="bookmark-avatar">
//                 <Avatar src={post.profilePhoto} />
//               </div>

//               {/* BODY */}

//               <div className="bookmark-body">
//                 {/* HEADER */}

//                 <div className="bookmark-header">
//                   <div>
//                     <h3>
//                       {post.name}

//                       <span className="bookmark-special">
//                         <VerifiedUserIcon className="bookmark-badge" />

//                         @{post.username}
//                       </span>
//                     </h3>
//                   </div>

//                   {/* UNBOOKMARK */}

//                   <Tooltip title="Remove Bookmark">
//                     <IconButton
//                       onClick={() => handleUnbookmark(post._id)}
//                     >
//                       <BookmarkIcon className="bookmark-icon-active" />
//                     </IconButton>
//                   </Tooltip>
//                 </div>

//                 {/* POST TEXT */}

//                 <div className="bookmark-description">
//                   <p>{post.postBody}</p>
//                 </div>

//                 {/* IMAGE */}

//                 {post.postImage && (
//                   <img
//                     className="bookmark-image"
//                     src={post.postImage}
//                     alt=""
//                   />
//                 )}

//                 {/* FOOTER */}

//                 <div className="bookmark-footer">
//                   <div className="bookmark-footer-item">
//                     <ChatBubbleOutlineIcon fontSize="small" />
//                   </div>

//                   <div className="bookmark-footer-item">
//                     <RepeatIcon fontSize="small" />
//                   </div>

//                   <div className="bookmark-footer-item">
//                     <FavoriteBorderIcon fontSize="small" />

//                     <span>{post.likes?.length || 0}</span>
//                   </div>

//                   <div className="bookmark-footer-item">
//                     <BookmarkBorderIcon fontSize="small" />

//                     <span>Saved</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Bookmarks;





import React, { useEffect, useState } from "react";
import { Avatar, IconButton, Tooltip } from "@mui/material";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import useLoggedInUser from "../../hooks/useLoggedInUser";

import "./Bookmarks.css";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [search, setSearch] = useState("");

  const [loggedInUser] = useLoggedInUser();

  // ================= GET BOOKMARKS =================

  const getBookmarks = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/get-bookmarked-posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: loggedInUser?._id,
          }),
        },
      );

      const data = await res.json();

      setBookmarks(data.bookmarks || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loggedInUser?._id) {
      getBookmarks();
    }
  }, [loggedInUser]);

  // ================= REMOVE BOOKMARK =================

  const handleUnbookmark = async (postId) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/unbookmark`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId,
            userId: loggedInUser._id,
          }),
        },
      );

      if (res.ok) {
        setBookmarks((prev) =>
          prev.filter((post) => post._id !== postId),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ================= SEARCH =================

  const filteredBookmarks = (bookmarks || []).filter(
    (post) =>
      post.name?.toLowerCase().includes(search.toLowerCase()) ||
      post.username?.toLowerCase().includes(search.toLowerCase()) ||
      post.postBody?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bookmark-container">
      {/* HEADER */}

      <div className="bookmark-header-main">
        <div>
          <h2>Bookmarks</h2>
          <p>Saved posts for later</p>
        </div>

        <input
          className="bookmark-search"
          placeholder="Search bookmarks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* EMPTY */}

      {filteredBookmarks.length === 0 ? (
        <div className="bookmark-empty">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
            alt=""
          />

          <h2>No Bookmarks Yet</h2>

          <p>Your saved posts will appear here.</p>
        </div>
      ) : (
        <div className="bookmark-list">
          {filteredBookmarks.map((post) => (
            <div className="bookmark-card" key={post._id}>
              {/* TOP */}

              <div className="bookmark-top">
                <div className="bookmark-user">
                  <Avatar src={post.profilePhoto} />

                  <div>
                    <h3>
                      {post.name}

                      <VerifiedUserIcon className="verified-icon" />
                    </h3>

                    <p>@{post.username}</p>
                  </div>
                </div>

                {/* UNBOOKMARK */}

                <Tooltip title="Remove Bookmark">
                  <IconButton
                    onClick={() => handleUnbookmark(post._id)}
                  >
                    <BookmarkIcon className="bookmark-active-icon" />
                  </IconButton>
                </Tooltip>
              </div>

              {/* TEXT */}

              <div className="bookmark-content">
                <p>{post.postBody}</p>
              </div>

              {/* IMAGE */}

              {post.postImage && (
                <img
                  className="bookmark-post-image"
                  src={post.postImage}
                  alt=""
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;