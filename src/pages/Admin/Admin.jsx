import { MessageSquareMore, NotebookText, ThumbsUp, User } from "lucide-react";
import Panel from "./Panel";
import { useState } from "react";
import { SideBar, SideBarItem } from "../../components/SideBar";

const Admin = () => {
    const [currentTable, setCurrentTable] = useState("users");
    return ( 
        <div className="max-w-screen max-h-screen flex">
            <SideBar>
                {/* SideBarItem({user, text, active}) */}
                <SideBarItem
                  icon={<User />}
                  text="Users"
                  active={currentTable === "users"}
                  onClick={() => {setCurrentTable("users")}}
                />
                <SideBarItem
                  icon={<NotebookText />}
                  text="Posts"
                  active={currentTable === "posts"}
                  onClick={() => {setCurrentTable("posts")}}
                />
                <SideBarItem
                  icon={<MessageSquareMore />}
                  text="Comments"
                  active={currentTable === "comments"}
                  onClick={() => {setCurrentTable("comments")}}
                />
                <SideBarItem
                  icon={<ThumbsUp />}
                  text="Likes"
                  active={currentTable === "likes"}
                  onClick={() => {setCurrentTable("likes")}}
                />
            </SideBar>
            <div className="bg-foreground flex-1 h-screen">
                {/* panel container to stop flow */}
                <div className="overflow-auto h-screen overflow-x-hidden">
                    <Panel currentTable={currentTable}/>
                </div>
            </div>
        </div>
     );
}

export default Admin;