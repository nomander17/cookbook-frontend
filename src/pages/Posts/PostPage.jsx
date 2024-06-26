import { useParams, useLocation, useNavigate } from "react-router-dom";
import Post from "./Post";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import HomeSideBar from "../Home/HomeSideBar";
import Comment from "../Comments/Comment";
import CreateComment from "../Comments/CreateComment";
import NoContent from "../../components/NoContent";
import BottomNavBar from "../../components/BottomNavBar";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import Notification from "../../components/Notifications";
import useNotification from "../../hooks/useNotification";

export default function PostPage() {
  const { postId } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(location.state?.post || null);
  const replyInFocus = location.state?.replyInFocus || false;
  const [comments, setComments] = useState([]);
  const [newPostCreated, setNewPostCreated] = useState(false);
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const { notification, showNotification, hideNotification } =
    useNotification();

  useEffect(() => {
    if (!post) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`/posts/${postId}`, {
            headers: {
              Authorization: authHeader,
            },
          });
          setPost(response.data);
        } catch (error) {
          console.error(`Error fetching post ${postId}: `, error);
        }
      };
      fetchPost();
    }
  }, [post, postId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        console.log("Fetching comments");
        const response = await axios.get(`/posts/${postId}/comments`, {
          headers: {
            Authorization: authHeader,
          },
        });
        console.log(`/posts/${postId}/comments`);
        console.log(response.data);
        setComments(response.data);
      } catch (error) {
        console.error(`Error fetching comments for post ${postId}: `, error);
      }
    };
    fetchComments();
  }, [postId, newPostCreated]);

  const handleNewPostCreated = () => {
    setNewPostCreated(!newPostCreated);
  };

  const removeCommentFromFeed = (commentId) => {
    console.log("Removing post with ID:", commentId);
    setComments((currentComments) =>
      currentComments.filter((comment) => comment.commentId !== commentId)
    );
  };

  const handlePostDeleted = () => {
    navigate("/home");
  };

  return (
    <div className="max-w-screen max-h-screen flex overflow-hidden">
      <div className="hidden md:block">
        <HomeSideBar active={"home"} />
      </div>
      <div className="bg-foreground flex-1 h-screen">
        {/* panel container to stop flow */}
        <div className="overflow-auto h-screen px-10 overflow-x-hidden pb-16 md:pb-0">
          <div className="mt-10">
            <Post
              postId={postId}
              timeFormat={"absolute"}
              onClickEnabled={false}
              onDelete={handlePostDeleted}
              truncate={false}
            />
          </div>
          {/* Create comment */}
          <CreateComment
            postId={postId}
            setComments={setComments}
            onCommentCreated={handleNewPostCreated}
            replyInFocus={replyInFocus}
            showNotification={showNotification}
          />
          {notification && (
            <div className="mt-5 flex justify-center self-center">
              <Notification
                content={notification.content}
                category={notification.category}
                onClose={hideNotification}
              />
            </div>
          )}
          {/* COMMENTS feed here */}
          <div className="mt-4">
            {comments.length === 0 ? (
              <NoContent />
            ) : (
              comments
                .sort((a, b) => new Date(b.time) - new Date(a.time))
                .map((comment) => (
                  <Comment
                    key={comment.commentId}
                    author={{
                      name: comment.user.name,
                      username: comment.user.username,
                      avatar: comment.user.avatar,
                    }}
                    postId={postId}
                    commentId={comment.commentId}
                    timeFormat={"relative"}
                    onDelete={() => removeCommentFromFeed(comment.commentId)}
                  />
                ))
            )}
          </div>
        </div>
      </div>
      {/* bottom navbar for small screens */}
      <div className="md:hidden fixed inset-x-0 bottom-0">
        <BottomNavBar />
      </div>
    </div>
  );
}
