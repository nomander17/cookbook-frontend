import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, User, Settings } from "lucide-react";

export default function BottomNavBar() {
  const [activeItem, setActiveItem] = useState("home");
  const navigate = useNavigate();

  const handleItemClick = (item, route) => {
    setActiveItem(item);
    navigate(route);
  };

  return (
    <nav className="fixed mt-5 bottom-0 left-0 right-0 z-10 md:hidden">
      <ul className="flex justify-around items-center bg-background shadow-md py-2">
        <li
          className={`
            flex flex-col items-center justify-center
            px-4 py-2 cursor-pointer transition-colors
            ${activeItem === "home" ? "text-blue-500" : "text-gray-500 hover:text-blue-500"}
          `}
          onClick={() => handleItemClick("home", "/home")}
        >
          <Home />
          <span className="text-xs mt-1">Home</span>
        </li>
        <li
          className={`
            flex flex-col items-center justify-center
            px-4 py-2 cursor-pointer transition-colors
            ${activeItem === "profile" ? "text-blue-500" : "text-gray-500 hover:text-blue-500"}
          `}
          onClick={() => handleItemClick("profile", "/profile")}
        >
          <User />
          <span className="text-xs mt-1">Profile</span>
        </li>
        <li
          className={`
            flex flex-col items-center justify-center
            px-4 py-2 cursor-pointer transition-colors
            ${activeItem === "settings" ? "text-blue-500" : "text-gray-500 hover:text-blue-500"}
          `}
          onClick={() => handleItemClick("settings", "/settings")}
        >
          <Settings />
          <span className="text-xs mt-1">Settings</span>
        </li>
      </ul>
    </nav>
  );
}