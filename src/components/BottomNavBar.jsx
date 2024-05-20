import { useNavigate } from "react-router-dom";
import { HomeIcon, User, ThumbsUp, SquarePen, Shield, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useAuthUserContext } from "./../context/AuthUserContext";
import axios from "../api/axios";

export default function BottomNavBar({ active }) {
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const [isAdmin, setIsAdmin] = useState(false);
  const signOut = useSignOut();
  const { authUser, setAuthUser } = useAuthUserContext();

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

  const logOut = () => {
    return () => {
      signOut();
      setAuthUser(null);
      navigate("/");
    };
  };

  return (
    <nav className="fixed mt-5 bottom-0 left-0 right-0 z-10 md:hidden">
      <ul className="flex justify-around items-center bg-background shadow-md py-2">
        <li
          className={`
            flex flex-col items-center justify-center
            px-4 py-2 cursor-pointer transition-colors
            ${active === "home" ? "text-blue-500" : "text-gray-500 hover:text-blue-500"}
          `}
          onClick={() => navigate("/home")}
        >
          <HomeIcon />
          <span className="text-xs mt-1">Home</span>
        </li>
        <li
          className={`
            flex flex-col items-center justify-center
            px-4 py-2 cursor-pointer transition-colors
            ${active === "profile" ? "text-blue-500" : "text-gray-500 hover:text-blue-500"}
          `}
          onClick={() => navigate("/profile")}
        >
          <User />
          <span className="text-xs mt-1">Profile</span>
        </li>
        <li
          className={`
            flex flex-col items-center justify-center
            px-4 py-2 cursor-pointer transition-colors
            ${active === "liked-posts" ? "text-blue-500" : "text-gray-500 hover:text-blue-500"}
          `}
          onClick={() => navigate("/liked-posts")}
        >
          <ThumbsUp />
          <span className="text-xs mt-1">Liked</span>
        </li>
        <li
          className={`
            flex flex-col items-center justify-center
            px-4 py-2 cursor-pointer transition-colors
            ${active === "create-post" ? "text-blue-500" : "text-gray-500 hover:text-blue-500"}
          `}
          onClick={() => navigate("/create-post")}
        >
          <SquarePen />
          <span className="text-xs mt-1">Create</span>
        </li>
        {isAdmin && (
          <li
            className={`
              flex flex-col items-center justify-center
              px-4 py-2 cursor-pointer transition-colors
              ${active === "admin" ? "text-blue-500" : "text-gray-500 hover:text-blue-500"}
            `}
            onClick={() => navigate("/admin")}
          >
            <Shield />
            <span className="text-xs mt-1">Admin</span>
          </li>
        )}
        <li
          className={`
            flex flex-col items-center justify-center
            px-4 py-2 cursor-pointer transition-colors
            text-gray-500 hover:text-blue-500
          `}
          onClick={logOut()}
        >
          <LogOut />
          <span className="text-xs mt-1">Logout</span>
        </li>
      </ul>
    </nav>
  );
}
