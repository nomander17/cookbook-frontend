import { useEffect, useState } from "react";
import CreatePost from "../Posts/CreatePost";
import Post from "../Posts/Post";
import NoContent from "../../components/NoContent";
import axios from "../../api/axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useNotification from "../../hooks/useNotification";
import Notification from "../../components/Notifications";
import SearchBar from "./SearchBar";

export const Feed = () => {
  const [posts, setPosts] = useState([]);
  const authHeader = useAuthHeader();

  const { notification, showNotification, hideNotification } =
    useNotification();
  const onPost = () => {
    showNotification("success", "Successfully posted.");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/posts", {
          headers: {
            Authorization: authHeader,
          },
        });
        setPosts(response.data);
        console.log("Fetched all posts in Feed");
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
    <div className="flex text-center w-full">
      <div className="md:w-3/4 m-auto w-[90%] bg-foreground">
        {notification && (
          <div className="mt-5 flex justify-center self-center">
            <Notification
              content={notification.content}
              category={notification.category}
              onClose={hideNotification}
            />
          </div>
        )}
        {/* search bar */}
        <SearchBar setPosts={setPosts} />
        <CreatePost setPosts={setPosts} onPost={onPost} />
        <div className="mt-4">
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
      </div>
    </div>
  );
};
