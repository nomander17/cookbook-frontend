import { Heart, MessageSquareReply, Trash } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useEffect } from "react";
import { absoluteTime, relativeTime } from "../Home/timeFormat";
import MarkdownIt from "markdown-it";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useAuthUserContext } from "./../../context/AuthUserContext";
import ContentLoading from "../../components/ContentLoading";

const mdParser = new MarkdownIt();

const Post = ({ postId, timeFormat, onClickEnabled, onDelete, truncate }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const authHeader = useAuthHeader();

  const { authUser } = useAuthUserContext();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/posts/${postId}`, {
          headers: {
            Authorization: authHeader,
          },
        });
        setPost(response.data);
        setLiked(alreadyLiked(response.data.likes));
        console.log("Fetching post ", postId);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching post ${postId}: `, error);
      }
    };
    fetchPost();
    // eslint-disable-next-line
  }, [postId]);

  const alreadyLiked = (likes) => {
    return likes.some((like) => like.user.userId === authUser.userId);
  };

  const handleLike = async () => {
    console.log("Like button clicked for post ", postId);
    if (liked) {
      // Unliking post
      const likeId = post.likes.find(
        (like) => like.user.userId === authUser.userId
      )?.likeId;
      try {
        await axios.delete(`/posts/${post.postId}/likes/${likeId}`, {
          headers: {
            Authorization: authHeader,
          },
        });
        setLiked(false);
        // Update post likes by filtering out the current user's like
        setPost({
          ...post,
          likes: post.likes.filter(
            (like) => like.user.userId !== authUser.userId
          ),
        });
      } catch (error) {
        console.error(`Error unliking post ${postId} `, error);
      }
    } else {
      // Liking post
      try {
        const response = await axios.post(
          `/posts/${post.postId}/likes`,
          {
            userId: authUser.userId,
            postId: post.postId,
          },
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );
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
    if (onClickEnabled) {
      navigate(`/posts/${postId}`, { state: { post, replyInFocus: true } });
    }
  };

  const handleDelete = async () => {
    console.log("Delete button clicked for post ", postId);
    try {
      const response = await axios.delete(`/posts/${postId}`, {
        headers: {
          Authorization: authHeader,
        },
      });
      console.log(response);
      onDelete();
    } catch (error) {
      console.error(`Error deleting post ${postId}`, error);
    }
  };

  const navigateToPost = () => {
    navigate(`/posts/${postId}`, { state: { post } });
  };

  const truncatePost = (body) => {
    if (typeof body === "string" && body.trim().length > 0) {
      const words = body.split(" ");
      if (words.length > 80) {
        return {
          truncatedText: words.slice(0, 80).join(" ") + "...",
          truncated: true,
        };
      }
      return {
        truncatedText: body,
        truncated: false,
      };
    }
    return {
      truncatedText: "",
      truncated: false,
    };
  };

  const renderMarkdown = (text) => {
    if (typeof text === "string" && text.trim().length > 0) {
      return mdParser.render(text);
    }
    return "";
  };

  if (loading) {
    return <ContentLoading />;
  }

  return (
    <div className="bg-[#384754] shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img
            className="inline-block h-10 w-10 rounded-full object-cover"
            src={getProfileImage()}
            alt=""
          />
        </div>
        <div className="ml-3">
          <p className="text-base leading-6 font-medium text-white">
            {post.user.name}
            <span className="text-sm leading-5 font-medium text-gray-400 ml-1">
              @{post.user.username} -{" "}
              {timeFormat === "relative"
                ? relativeTime(post.time)
                : absoluteTime(post.time)}
            </span>
          </p>
        </div>
      </div>
      <div className="mt-4">
        <div
          onClick={onClickEnabled ? navigateToPost : undefined}
          className="text-base font-medium text-offwhite whitespace-pre-wrap text-left"
        >
          {truncate ? (
            <>
              <div
                className="markdown-body"
                dangerouslySetInnerHTML={{
                  __html: renderMarkdown(truncatePost(post.text).truncatedText),
                }}
              />
              {truncatePost(post.text).truncated && (
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={navigateToPost}
                >
                  Read more
                </span>
              )}
            </>
          ) : (
            <div
              className="markdown-body"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(post.text),
              }}
            />
          )}
        </div>
        {post.image && (
          <div className="mt-4">
            <img
              onClick={onClickEnabled ? navigateToPost : undefined}
              className="rounded-lg w-full max-h-96 object-contain"
              src={`data:image/jpeg;base64,${post.image}`}
              alt="Post"
            />
          </div>
        )}
        {/* Interactions */}
        <div className="flex justify-start items-center mt-4 resize-x text-xs md:text-sm">
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
            {post.likes.length} {post.likes.length > 1 ? "Likes" : "Like"}
          </button>
          {onClickEnabled ? (
            <button
              className="flex mr-5 items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
              onClick={handleReply}
            >
              <MessageSquareReply className="mr-2" />
              Reply
            </button>
          ) : (
            <></>
          )}

          {post.user.userId === authUser.userId && (
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
