import React, { useState, useEffect } from "react";
import request from "../../axiosHelper";
import { Heart } from "lucide-react";
import { absoluteTime, relativeTime } from "../Home/timeFormat";

const currentUser = {
  userId: 2,
  username: "Admin",
};

const Comment = ({ commentId, author, content, timeFormat }) => {
  const [comment, setComment] = useState({
    user: {
      name: "",
      username: "",
      avatar: "NO ICON",
    },
    likes: [],
  });

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await request.get(`/comments/${commentId}`);
        setComment(response.data);
        setLiked(alreadyLiked(response.data.likes));
      } catch (error) {
        console.error(`Error fetching comment ${commentId}: `, error);
      }
    };

    fetchComment();
  }, [commentId]);

  const alreadyLiked = (likes) => {
    return likes.some((like) => like.user.userId === currentUser.userId);
  };

  const handleLike = async () => {
    console.log("Like button clicked for comment ", commentId);
    if (liked) {
      // Unliking comment
      const likeId = comment.likes.find(
        (like) => like.user.userId === currentUser.userId
      )?.likeId;
      try {
        await request.delete(`/comments/${commentId}/likes/${likeId}`);
        setLiked(false);
        // Update comment likes by filtering out the current user's like
        setComment({
          ...comment,
          likes: comment.likes.filter(
            (like) => like.user.userId !== currentUser.userId
          ),
        });
      } catch (error) {
        console.error(`Error unliking comment ${commentId} `, error);
      }
    } else {
      // Liking comment
      try {
        const response = await request.post(`/comments/${commentId}/likes`, {
          userId: currentUser.userId,
          commentId: commentId,
        });
        setLiked(true);
        // Update comment likes by adding the new like
        setComment({
          ...comment,
          likes: [...comment.likes, response.data],
        });
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setLiked(true);
        } else {
          console.error(`Error liking comment ${commentId} `, error);
        }
      }
    }
  };

  const getProfileImage = () => {
    if (author.avatar) {
      return `data:image/jpeg;base64,${author.avatar}`;
    } else {
      const nameParams = author.name.split(" ").join("+");
      return `https://ui-avatars.com/api/?name=${nameParams}&background=random`;
    }
  };

  // Format the time based on the timeFormat prop
  const formattedTime = timeFormat === "relative" ? relativeTime(comment.time) : absoluteTime(comment.time);

  return (
    <div className="bg-background p-4 my-2 rounded">
      <div className="flex items-center">
        <img src={getProfileImage()} alt="avatar" className="w-10 h-10 rounded-full" />
        <div className="ml-4">
          <p className="font-bold">{author.name}</p>
          <p className="text-xs text-gray-500">@{author.username}</p>
        </div>
      </div>
      <p className="mt-2">{content}</p>
      <p className="text-xs text-gray-500 mt-2">{formattedTime}</p>
      {/* Like button */}
      <button
        className="flex mt-2 items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
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
    </div>
  );
};

export default Comment;