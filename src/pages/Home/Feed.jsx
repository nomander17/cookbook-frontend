import { useEffect, useState } from "react";
import CreatePost from "../Posts/CreatePost";
import Post from "../Posts/Post";
import NoContent from "../../components/NoContent";
import axios from "../../api/axios";

export const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/posts");
        setPosts(response.data);
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
      <div className="md:w-2/3 m-auto w-[90%] bg-foreground">
        <CreatePost setPosts={setPosts} />
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
