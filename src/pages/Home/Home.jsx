import { Bell, HomeIcon, SquarePen, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Feed } from "./Feed";
import { SideBar, SideBarItem } from "./../../components/SideBar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-screen max-h-screen flex">
      <SideBar>
        {/* SideBarItem({user, text, active}) */}
        <SideBarItem
          icon={<HomeIcon />}
          text={"Home"}
          active={true}
          onClick={() => {
            navigate("/home");
          }}
        />
        <SideBarItem
          icon={<User />}
          text="Profile"
          active={false}
          onClick={() => {
            navigate("/profile");
          }}
        />
        <SideBarItem
            icon={<Bell/>}
            text={"Notifications"}
            active={false}
            onClick={() => {
                navigate("/notifications");
            }}
        />
        <SideBarItem
            icon={<SquarePen />}
            text={"Post"}
            active={false}
            onClick={() => {
                navigate("/post");
            }}
        />
      </SideBar>
      <div className="bg-foreground flex-1 h-screen">
        {/* panel container to stop flow */}
        <div className="overflow-auto h-screen overflow-x-hidden">
          <Feed />
        </div>
      </div>
    </div>
  );
};

export { Home };
