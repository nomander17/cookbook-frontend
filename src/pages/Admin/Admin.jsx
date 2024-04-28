import { MessageSquareMore, NotebookText, ThumbsUp, User } from "lucide-react";
import { SideBarItem, Sidebar } from "../../components/Sidebar";

const Admin = () => {
    return ( 
        <div className="max-w-screen max-h-screen flex">
            <Sidebar>
                {/* SideBarItem({user, text, active}) */}
                <SideBarItem icon={<User/>} text="Users" active />
                <SideBarItem icon={<NotebookText/>} text="Posts" />
                <SideBarItem icon={<MessageSquareMore/>} text="Comments" />
                <SideBarItem icon={<ThumbsUp/>} text="Likes" />
            </Sidebar>
            <div className="bg-foreground flex-1 h-screen">

            </div>
        </div>
     );
}

export default Admin;