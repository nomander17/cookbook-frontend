import { createContext, useContext, useEffect, useState } from "react";
import Logo from "./../assets/logo-no-background.png";
import { ExpandIcon, LogOut, Minimize2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useAuthUserContext } from "../context/AuthUserContext";
import axios from "../api/axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
const SideBarContext = createContext();

export function SideBar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const signOut = useSignOut();
  const { authUser, setAuthUser } = useAuthUserContext();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("");
  const [user, setUser] = useState({});
  const authHeader = useAuthHeader();
  const [loading, setLoading] = useState(true);

  const logOut = () => {
    return () => {
      signOut();
      setAuthUser(null);
      navigate("/");
    };
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/users/${authUser.userId}`, {
          headers: {
            Authorization: authHeader,
          },
        });
        const fetchedUser = response.data;
        setUser(fetchedUser);
        if (fetchedUser.avatar === null) {
          const nameParams = fetchedUser.name.split(" ").join("+");
          setProfileImage(
            `https://ui-avatars.com/api/?name=${nameParams}&background=random`
          );
        } else {
          setProfileImage(`data:image/jpeg;base64,${fetchedUser.avatar}`);
        }
      } catch (error) {
        console.error("Error fetching user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileImage();
  }, [authUser.userId, authHeader]);

  return (
    <aside className={`h-screen z-10 transform relative`}>
      <nav className="h-full flex flex-col bg-background shadow-md">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={Logo}
            className={`overflow-hidden hover:cursor-pointer transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt="logo"
            onClick={() => navigate("/home")}
          />
          <button
            className="rounded-xl"
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            {expanded ? (
              <Minimize2 color="white" />
            ) : (
              <ExpandIcon color="white" />
            )}
          </button>
        </div>

        <SideBarContext.Provider value={{ expanded }}>
          <ul className="flex-1 mt-4 px-3">{children}</ul>
        </SideBarContext.Provider>
        {loading ? (
          // loading user
          <div className="border-t border-gray-600 flex p-3 animate-pulse">
            <div className="w-12 h-12 rounded-md bg-gray-300"></div>
            <div
              className={`
          flex justify-between items-center
          overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
        `}
            >
              <div className="leading-4 ml-3">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
                <div className="h-3 w-24 bg-gray-300 rounded mt-2"></div>
              </div>
              <div className="h-6 w-6 bg-gray-300 rounded-full ml-auto"></div>
            </div>
          </div>
        ) : (
          <div className="border-t border-gray-600 flex p-3">
            <img
              src={profileImage}
              alt="User avatar"
              className="w-12 h-12 rounded-md hover:cursor-pointer object-cover"
              onClick={() => {
                navigate("/profile");
              }}
            />
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
            `}
            >
              <div className="leading-4 text-white">
                <h4 className="font-semibold text-sm text-white">
                  {user.name}
                </h4>
                <span className="text-sm text-gray-600">@{user.username}</span>
              </div>
              <div className="hover:cursor-pointer">
                <LogOut color="white" onClick={logOut()} />
              </div>
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
}

export function SideBarItem({ icon, text, active, onClick }) {
  const { expanded } = useContext(SideBarContext);

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-slate-100 text-blue-500"
            : "hover:bg-slate-100 hover:text-blue-500 text-gray-500"
        }
      `}
      onClick={onClick}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-slate-100 text-blue-500 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
