import { useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useAuthUserContext } from "../../context/AuthUserContext";
import Post from "../Posts/Post";
import NoContent from "./../../components/NoContent";
import axios from "../../api/axios";

export default function ProfilePosts() {
  const [posts, setPosts] = useState([]);
  const authHeader = useAuthHeader();
  const { authUser } = useAuthUserContext();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`users/${authUser.userId}/posts`, {
          headers: {
            Authorization: authHeader,
          },
        });
        setPosts(response.data);
        console.log("Fetched all posts in user profile");
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const removePostFromFeed = (postId) => {
    console.log("Removing post with ID:", postId);
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.postId !== postId)
    );
  };

  return (
    <div className="md:w-3/4 m-auto w-[90%] bg-foreground mt-4">
      {posts.length === 0 ? (
        <NoContent />
      ) : (
        posts
          .sort((a, b) => new Date(b.time) - new Date(a.time))
          .map((post) => (
            <Post
              key={post.postId}
              author={{
                name: post.user.name,
                username: post.user.username,
                avatar: post.user.avatar,
              }}
              postId={post.postId}
              timeFormat={"relative"}
              onClickEnabled={true}
              onDelete={() => removePostFromFeed(post.postId)}
              truncate={true}
            />
          ))
      )}
    </div>
  );
}
