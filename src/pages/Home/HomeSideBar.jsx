import { useNavigate } from "react-router-dom";
import { SideBar, SideBarItem } from "../../components/SideBar";
import {
  Bell,
  HomeIcon,
  Shield,
  SquarePen,
  ThumbsUp,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function HomeSideBar({ active }) {
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
        active={active === "home"}
        onClick={() => {
          navigate("/home");
        }}
      />
      <SideBarItem
        icon={<User />}
        text="Profile"
        active={active === "profile"}
        onClick={() => {
          navigate("/profile");
        }}
      />
      <SideBarItem
        icon={<ThumbsUp />}
        text={"Liked posts"}
        active={active === "liked-posts"}
        onClick={() => {
          navigate("/liked-posts");
        }}
      />
      <SideBarItem
        icon={<SquarePen />}
        text={"Create Post"}
        active={active === "create-post"}
        onClick={() => {
          navigate("/create-post");
        }}
      />
      {isAdmin && (
        <SideBarItem
          icon={<Shield />}
          text="Admin"
          active={active === "admin"}
          onClick={() => {
            navigate("/admin");
          }}
        />
      )}
    </SideBar>
  );
}

export default HomeSideBar;
