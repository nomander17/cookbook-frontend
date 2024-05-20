import { useState } from "react";
import CreatePost from "../Posts/CreatePost";
import HomeSideBar from "../Home/HomeSideBar";
import BottomNavBar from "../../components/BottomNavBar";
import useNotification from "../../hooks/useNotification";
import Notification from "./../../components/Notifications";

export default function CreatePostPage() {
  const { notification, showNotification, hideNotification } =
    useNotification();
  const onPost = () => {
    showNotification("success", "Successfully posted.");
  };

  const [posts, setPosts] = useState([]);
  return (
    <div className="flex flex-col md:flex-row max-w-screen max-h-screen">
      <div className="hidden md:block">
        <HomeSideBar active={"create-post"} />
      </div>
      <div className="bg-foreground flex-1 h-screen md:w-3/4">
        {/* panel container to stop flow */}
        <div className="overflow-auto h-screen overflow-x-hidden pb-16 md:pb-0">
          <div className="bg-gray-900 mt-4 md:w-3/4 m-auto w-[90%] rounded-lg py-10 px-4 text-center border-b border-gray-700">
            <h2 className="text-4xl font-bold mb-3 text-white">
              Create A New Post
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Whatcha cooking?
            </p>
          </div>
          <div className="md:w-3/4 mx-auto my-5 w-[90%] bg-foreground">
            {notification && (
              <div className="mt-5 flex justify-center self-center">
                <Notification
                  content={notification.content}
                  category={notification.category}
                  onClose={hideNotification}
                />
              </div>
            )}
            <CreatePost setPosts={setPosts} largeText={true} onPost={onPost} />
          </div>
        </div>
      </div>
      {/* bottom navbar for small screens */}
      <div className="md:hidden fixed inset-x-0 bottom-0">
        <BottomNavBar active={"create-post"} />
      </div>
    </div>
  );
}
