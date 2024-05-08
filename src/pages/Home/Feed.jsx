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
                  key={post.id}
                  author={{
                    name: post.user.name,
                    username: post.user.username,
                    avatar: post.user.avatar,
                  }}
                  timestamp={new Date(post.time).toLocaleString()}
                  content={post.text}
                  image={post.image}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
};
