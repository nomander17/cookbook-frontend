import { MessageSquareMore, NotebookText, ThumbsUp, User } from "lucide-react";
import Panel from "./Panel";
import { useEffect, useState } from "react";
import { SideBar, SideBarItem } from "./../../components/SideBar";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const Admin = () => {
  const [currentTable, setCurrentTable] = useState("users");
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const response = await axios.get("/auth/is-admin", {
          headers: {
            Authorization: authHeader,
          },
        });
        if(response.data === false) {
          navigate("/home");
        }
      } catch (error) {
        if (error.response.status === 401)
          console.error("Error checking admin access:", error);
      }
    };

    checkAdminAccess();
  }, []);

  return (
    <div className="max-w-screen max-h-screen flex">
      <SideBar>
        {/* SideBarItem({user, text, active}) */}
        <SideBarItem
          icon={<User />}
          text="Users"
          active={currentTable === "users"}
          onClick={() => {
            setCurrentTable("users");
          }}
        />
        <SideBarItem
          icon={<NotebookText />}
          text="Posts"
          active={currentTable === "posts"}
          onClick={() => {
            setCurrentTable("posts");
          }}
        />
        <SideBarItem
          icon={<MessageSquareMore />}
          text="Comments"
          active={currentTable === "comments"}
          onClick={() => {
            setCurrentTable("comments");
          }}
        />
        <SideBarItem
          icon={<ThumbsUp />}
          text="Likes"
          active={currentTable === "likes"}
          onClick={() => {
            setCurrentTable("likes");
          }}
        />
      </SideBar>
      <div className="bg-foreground flex-1 h-screen">
        {/* panel container to stop flow */}
        <div className="overflow-auto h-screen overflow-x-hidden">
          <Panel currentTable={currentTable} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
