import { useParams, useLocation, useNavigate } from "react-router-dom";
import Post from "./Post";
import { useState, useEffect } from "react";
import request from "../../axiosHelper";
import HomeSideBar from "../Home/HomeSideBar";
import Comment from "../Comments/Comment";
import CreateComment from "../Comments/CreateComment";
import NoContent from "../../components/NoContent";
import BottomNavBar from "../../components/BottomNavBar";

export default function PostPage() {
  const { postId } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(location.state?.post || null);
  const replyInFocus = location.state?.replyInFocus || false;
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const [newPostCreated, setNewPostCreated] = useState(false);

  useEffect(() => {
    if (!post) {
      const fetchPost = async () => {
        try {
          const response = await request.get(`/posts/${postId}`);
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
        const response = await request.get(`/posts/${postId}/comments`);
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
        <HomeSideBar />
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
          />
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
      <div className="md:hidden fixed bottom-0 left-0 right-0">
        <BottomNavBar />
      </div>
    </div>
  );
}
