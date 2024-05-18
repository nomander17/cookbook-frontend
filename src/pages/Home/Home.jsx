import { Feed } from "./Feed";
import HomeSideBar from "./HomeSideBar";
import BottomNavBar from "../../components/BottomNavBar";
import { useEffect, useState } from "react";

const Home = () => {
  const HIDE_SIDEBAR_WIDTH = 886;
  const [isSideBarVisible, setIsSideBarVisible] = useState(
    window.innerWidth > HIDE_SIDEBAR_WIDTH
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSideBarVisible(window.innerWidth >= 866);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row max-w-screen max-h-screen">
      {isSideBarVisible ? (
        <div className="block">
          <HomeSideBar active={"home"} />
        </div>
      ) : (
        <></>
      )}
      <div className="bg-foreground flex-1 h-screen md:w-3/4">
        {/* panel container to stop flow */}
        <div className="overflow-auto h-screen overflow-x-hidden pb-16 md:pb-0">
          <Feed />
        </div>
      </div>
      {/* bottom navbar for small screens */}
      {!isSideBarVisible ? (
        <div className="fixed inset-x-0 bottom-0">
          <BottomNavBar active={"home"} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export { Home };
