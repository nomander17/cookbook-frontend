import { useEffect, useState } from "react";
import request from "../../axiosHelper";
import CreatePost from "./CreatePost";
import Post from "./Post";
import NoPosts from "./NoPosts";

export const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await request.get("/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const removePostFromFeed = (postId) => {
    console.log('Removing post with ID:', postId);
    setPosts(currentPosts => currentPosts.filter(post => post.postId !== postId));
  };

  return (
    <div className="flex text-center">
      <div className="w-1/2 m-auto bg-foreground">
        <CreatePost setPosts={setPosts} />
        <div className="mt-4">
          {posts.length === 0 ? (
            <NoPosts />
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
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
};
