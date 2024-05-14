import { Feed } from "./Feed";
import HomeSideBar from "./HomeSideBar";
import BottomNavBar from "../../components/BottomNavBar";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row max-w-screen max-h-screen">
      <div className="hidden md:block">
        <HomeSideBar />
      </div>
      <div className="bg-foreground flex-1 h-screen md:w-3/4">
        {/* panel container to stop flow */}
        <div className="overflow-auto h-screen overflow-x-hidden pb-16 md:pb-0">
          <Feed />
        </div>
      </div>
      {/* bottom navbar for small screens */}
      <div className="md:hidden fixed inset-x-0 bottom-0">
        <BottomNavBar />
      </div>
    </div>
  );
};

export { Home };
