import { useParams, useLocation, useNavigate } from "react-router-dom";
import Post from "./Post";
import { useState, useEffect } from "react";
import request from "../../axiosHelper";
import HomeSideBar from "./HomeSideBar";

export default function PostPage() {
  const { postId } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(location.state?.post || null);
  const navigate = useNavigate();

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

  const handlePostDeleted = () => {
    navigate("/home");
  };

  return (
    <div className="max-w-screen max-h-screen flex">
      <HomeSideBar />
      <div className="bg-foreground flex-1 h-screen">
        {/* panel container to stop flow */}
        <div className="overflow-auto px-10 mt-10 h-screen overflow-x-hidden">
          <Post
            postId={postId}
            timeFormat={"absolute"}
            onClickEnabled={false}
            onDelete={handlePostDeleted}
          />
          {/* COMMENTS here */}
        </div>
      </div>
    </div>
  );
}
