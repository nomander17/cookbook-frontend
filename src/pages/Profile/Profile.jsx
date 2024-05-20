import HomeSideBar from "../Home/HomeSideBar";
import BottomNavBar from "../../components/BottomNavBar";
import ProfileComponent from "./ProfileComponent";
import ProfilePosts from "./ProfilePosts";

export default function Profile() {
  return (
    <div className="flex flex-col md:flex-row max-w-screen max-h-screen">
      <div className="hidden md:block">
        <HomeSideBar active={"profile"} />
      </div>
      <div className="bg-foreground flex-1 h-screen md:w-3/4">
        {/* panel container to stop flow */}
        <div className="overflow-auto h-screen overflow-x-hidden pb-16 md:pb-0">
          <ProfileComponent />
          {/* User posts */}
          <ProfilePosts />
        </div>
      </div>
      {/* bottom navbar for small screens */}
      <div className="md:hidden fixed inset-x-0 bottom-0">
        <BottomNavBar active={"profile"} />
      </div>
    </div>
  );
}
