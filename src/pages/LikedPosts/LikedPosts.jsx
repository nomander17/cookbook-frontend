import HomeSideBar from "../Home/HomeSideBar";
import BottomNavBar from "../../components/BottomNavBar";
import LikedPostsFeed from "./LikedPostsFeed";

export default function LikedPosts() {
  return (
    <div className="flex flex-col md:flex-row max-w-screen max-h-screen">
      <div className="hidden md:block">
        <HomeSideBar active={"liked-posts"} />
      </div>
      <div className="bg-foreground flex-1 h-screen md:w-3/4">
        {/* panel container to stop flow */}
        <div className="overflow-auto h-screen overflow-x-hidden pb-16 md:pb-0">
          <div className="bg-gray-900 mt-4 md:w-3/4 m-auto w-[90%] py-10 px-4 rounded-lg text-center border-b border-gray-700">
            <h2 className="text-4xl font-bold mb-3 text-white">
              Posts You've Liked
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Here are the posts you've enjoyed and given a like to!
            </p>
          </div>
          <LikedPostsFeed />
        </div>
      </div>
      {/* bottom navbar for small screens */}
      <div className="md:hidden fixed inset-x-0 bottom-0">
        <BottomNavBar active={"liked-posts"} />
      </div>
    </div>
  );
}
