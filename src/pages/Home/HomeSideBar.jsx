import { useNavigate } from "react-router-dom";
import { SideBar, SideBarItem } from "../../components/SideBar";
import { Bell, HomeIcon, Shield, SquarePen, User } from "lucide-react";

function HomeSideBar() {
  const navigate = useNavigate();

  return (
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
        icon={<Bell />}
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
      <SideBarItem
        icon={<Shield />}
        text="Admin"
        active={false}
        onClick={() => {
          navigate("/admin");
        }}
      />
    </SideBar>
  );
}

export default HomeSideBar;
