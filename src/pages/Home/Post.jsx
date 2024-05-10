import { Heart, MessageSquareReply, Trash } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../../axiosHelper";
import { useEffect } from "react";
import { absoluteTime, relativeTime } from "./timeFormat";

// Current userId is the user currently logged in
// import jwt_decode from "jwt-decode";

// const token = localStorage.getItem('token');
// const currentUser = token ? jwt_decode(token) : null;

// for now it is 1
const currentUser = {
  userId: 1,
  username: "Admin",
};

const Post = ({ postId, timeFormat, onClickEnabled, onDelete }) => {
  const [post, setPost] = useState({
    user: {
      name: "",
      username: "",
      avatar: "NO ICON"
    }
  });

  const [liked, setLiked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await request.get(`/posts/${postId}`);
        setPost(response.data);
        setLiked(alreadyLiked(response.data.likes));
      } catch (error) {
        console.error(`Error fetching post ${postId}: `, error);
      }
    };

    fetchPost();
  }, [postId]);

  const alreadyLiked = (likes) => {
    return likes.some((like) => like.user.userId === currentUser.userId);
  };

  const handleLike = async () => {
    console.log("Like button clicked for post ", postId);
    if (liked) {
      // Unliking post
      const likeId = post.likes.find(
        (like) => like.user.userId === currentUser.userId
      )?.likeId;
      try {
        await request.delete(`/posts/${post.postId}/likes/${likeId}`);
        setLiked(false);
        // Update post likes by filtering out the current user's like
        setPost({
          ...post,
          likes: post.likes.filter(
            (like) => like.user.userId !== currentUser.userId
          ),
        });
      } catch (error) {
        console.error(`Error unliking post ${postId} `, error);
      }
    } else {
      // Liking post
      try {
        const response = await request.post(`/posts/${post.postId}/likes`, {
          userId: currentUser.userId,
          postId: post.postId,
        });
        setLiked(true);
        // Update post likes by adding the new like
        setPost({
          ...post,
          likes: [...post.likes, response.data],
        });
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setLiked(true);
        } else {
          console.error(`Error liking post ${postId} `, error);
        }
      }
    }
  };

  const getProfileImage = () => {
    if (post.user.avatar) {
      return `data:image/jpeg;base64,${post.user.avatar}`;
    } else {
      const nameParams = post.user.name.split(" ").join("+");
      return `https://ui-avatars.com/api/?name=${nameParams}&background=random`;
    }
  };

  const handleReply = () => {
    console.log("Reply button clicked for post ", postId);
  };

  const handleDelete = async () => {
    console.log("Delete button clicked for post ", postId);
    try {
      const response = await request.delete(`/posts/${postId}`);
      console.log(response);
      onDelete();
    } catch (error) {
      console.error(`Error deleting post ${postId}`, error);
    }
  }

  const navigateToPost = () => {
    navigate(`/posts/${postId}`, { state: { post } });
  };

  return (
    <div className="bg-[#384754] shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img
            className="inline-block h-10 w-10 rounded-full"
            src={getProfileImage()}
            alt=""
          />
        </div>
        <div className="ml-3">
          <p className="text-base leading-6 font-medium text-white">
            {post.user.name}
            <span className="text-sm leading-5 font-medium text-gray-400 ml-1">
              @{post.user.username} - {timeFormat === 'relative' ? relativeTime(post.time) : absoluteTime(post.time)}
            </span>
          </p>
        </div>
      </div>
      <div className="mt-4">
        <div
          onClick={onClickEnabled ? navigateToPost : undefined}
          className="text-base font-medium text-offwhite whitespace-pre-wrap text-left"
        >
          {post.text}
        </div>
        {post.image && (
          <div className="mt-4">
            <img
              className="rounded-lg w-full max-h-96 object-contain"
              src={`data:image/jpeg;base64,${post.image}`}
              alt="Post"
            />
          </div>
        )}
        {/* Interactions */}
        <div className="flex justify-start items-center mt-4">
          <button
            className="flex mr-5 items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            onClick={handleLike}
          >
            {liked ? (
              <Heart
                fill="red"
                strokeWidth={0}
                className={`mr-2 ${liked ? "animate-pop" : ""}`}
              />
            ) : (
              <Heart className="mr-2" />
            )}
            Like
          </button>
          <button
            className="flex mr-5 items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            onClick={handleReply}
          >
            <MessageSquareReply className="mr-2" />
            Reply
          </button>
        {post.user.userId === currentUser.userId && (
          <button
            className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
            onClick={handleDelete}
          >
            <Trash className="mr-2" />
            Delete
          </button>
        )}
        </div>
      </div>
    </div>
  );
};

export default Post;
