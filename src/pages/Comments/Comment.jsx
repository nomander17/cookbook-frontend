import { Heart, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { absoluteTime, relativeTime } from "../Home/timeFormat";
import axios from "../../api/axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

// Current userId is the user currently logged in
// import jwt_decode from "jwt-decode";

// const token = localStorage.getItem('token');
// const currentUser = token ? jwt_decode(token) : null;

// for now it is 1
const currentUser = {
  userId: 2,
  username: "Admin",
};

const Comment = ({ commentId, postId, author, onDelete, timeFormat }) => {
  const [comment, setComment] = useState({
    user: {
      name: "",
      username: "",
      avatar: "NO ICON",
    },
    likes: [],
    text: "",
    time: "",
  });

  const [liked, setLiked] = useState(false);
  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `/posts/${postId}/comments/${commentId}`,
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );
        setComment(response.data);
        setLiked(alreadyLiked(response.data.likes));
      } catch (error) {
        console.error(`Error fetching post ${postId}: `, error);
      }
    };

    fetchComments();
  }, [commentId, postId]);

  const alreadyLiked = (likes) => {
    return likes.some((like) => like.user.userId === currentUser.userId);
  };

  const getProfileImage = () => {
    if (author.avatar) {
      return `data:image/jpeg;base64,${comment.user.avatar}`;
    } else {
      const nameParams = author.name.split(" ").join("+");
      return `https://ui-avatars.com/api/?name=${nameParams}&background=random`;
    }
  };

  const handleLike = async () => {
    console.log("Like button clicked for comment ", commentId);
    if (liked) {
      // Unliking comment
      const likeId = comment.likes.find(
        (like) => like.user.userId === currentUser.userId
      )?.likeId;
      try {
        await axios.delete(
          `/posts/${postId}/comments/${comment.commentId}/likes/${likeId}`,
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );
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
        const response = await axios.post(
          `/posts/${postId}/comments/${comment.commentId}/likes`,
          {
            userId: currentUser.userId,
            commentId: comment.commentId,
          },
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );
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

  const handleDelete = async () => {
    console.log("delete pressed");
    try {
      const response = await axios.delete(
        `/posts/${postId}/comments/${commentId}`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      console.log(response);
      onDelete();
    } catch (error) {
      console.error(`Error deleting post ${postId}`, error);
    }
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
            {author.name}
            <span className="text-sm leading-5 font-medium text-gray-400 ml-1">
              @{author.username} -{" "}
              {timeFormat === "relative"
                ? relativeTime(comment.time)
                : absoluteTime(comment.time)}
            </span>
          </p>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-base font-medium text-offwhite whitespace-pre-wrap text-left">
          {comment.text}
        </div>
        {comment.image && (
          <div className="mt-4">
            <img
              className="rounded-lg w-full max-h-96 object-contain"
              src={`data:image/jpeg;base64,${comment.image}`}
              alt="comment"
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
          {comment.user.userId === currentUser.userId && (
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

export default Comment;
