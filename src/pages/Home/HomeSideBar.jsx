import { useNavigate } from "react-router-dom";
import { SideBar, SideBarItem } from "../../components/SideBar";
import { Bell, HomeIcon, Shield, SquarePen, User } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function HomeSideBar() {
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const checkIsAdmin = async () => {
      try {
        const response = await axios.get("/auth/is-admin", {
          headers: {
            Authorization: authHeader,
          },
        });
        setIsAdmin(response.data);
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    };

    checkIsAdmin();
  }, [authHeader]);
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
      {isAdmin && (
        <SideBarItem
          icon={<Shield />}
          text="Admin"
          active={false}
          onClick={() => {
            navigate("/admin");
          }}
        />
      )}
    </SideBar>
  );
}

export default HomeSideBar;
