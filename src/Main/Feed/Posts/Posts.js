import { Avatar, IconButton, Tooltip } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PublishIcon from "@mui/icons-material/Publish";

import { useState } from "react";

import "./Posts.css";
import "./editModel.css";

const Post = ({ p, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState(p.postBody);
  const [editImage, setEditImage] = useState(p.postImage || null);

  const { name, username, postImage, postBody, profilePhoto, _id } = p;

  const handleUpdate = () => {
    onUpdate({
      ...p,
      postBody: editBody,
      postImage: editImage,
    });
    setIsEditing(false);
  };

const handleImageChange = async (e) => {

  const file = e.target.files[0];

  if (!file) return;

  try {
   
    const formData = new FormData();
    formData.set("image", file);

    const res = await fetch(
      "https://api.imgbb.com/1/upload?key=22741e46a20f61109c000473abeaac5b",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

   
    setEditImage(data.data.display_url);

    console.log("Uploaded Image URL:", data.data.display_url);

  } catch (error) {
    console.error("Image upload error:", error);
  }
};

  const removeImage = () => {
    setEditImage(null);
  };

  return (
    <div className="post">
      <div className="post_avatar">
        <Avatar src={profilePhoto} />
      </div>

      <div className="post__body">
        <div className="post_header">
          <div className="post__headerText">
            <h3>
              {name}{" "}
              <span className="post__headerSpecial">
                <VerifiedUserIcon className="post_badge" /> @{username}
              </span>
            </h3>

            <div className="flex items-center space-x-1">
              {/* EDIT */}
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  onClick={() => setIsEditing(true)}
                  className="!text-zinc-400 hover:!text-sky-500"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>

             
              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  onClick={() => onDelete(_id)}
                  className="!text-zinc-400 hover:!text-rose-500"
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <div className="post__headerDescription">
            <p>{postBody}</p>
          </div>
        </div>

        {postImage && <img src={postImage} alt="post" width="500" />}

        <div className="post__footer">
          <ChatBubbleOutlineIcon
            className="post__footer__icon"
            fontSize="small"
          />
          <RepeatIcon className="post__footer__icon" fontSize="small" />
          <FavoriteBorderIcon className="post__footer__icon" fontSize="small" />
          <PublishIcon className="post__footer__icon" fontSize="small" />
        </div>

    
        {isEditing && (
          <div className="modal-overlay" onClick={() => setIsEditing(false)}>
            <div
              className="modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Edit Tweet</h2>
                <button
                  className="btn-cancel"
                  style={{ background: "transparent", fontSize: "20px" }}
                  onClick={() => setIsEditing(false)}
                >
                  ×
                </button>
              </div>

              <div className="modal-body">
                <textarea
                  autoFocus
                  className="modal-textarea"
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                />

                {editImage && (
                  <div className="modal-image-preview">
                    <img src={editImage} alt="Preview" />
                    <button className="remove-image-btn" onClick={removeImage}>
                      ×
                    </button>
                  </div>
                )}

                <div className="image-upload-wrapper">
                  <label className="image-upload-btn">
                    <PublishIcon fontSize="small" />
                    <span>{editImage ? "Change Image" : "Add Image"}</span>
                    {editImage && (
                      <p style={{ fontSize: "12px", color: "gray" }}>
                        Image selected
                      </p>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

              </div>

              <div className="modal-footer">
                <button className="btn" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>

                <button
                  className="btn btn-update"
                  onClick={handleUpdate}
                  disabled={
                    !editBody.trim() ||
                    (editBody === postBody && editImage === postImage)
                  }
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
