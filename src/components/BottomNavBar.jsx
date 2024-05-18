import { useNavigate } from "react-router-dom";
import { Home, User, Settings } from "lucide-react";

export default function BottomNavBar({ active }) {
  const navigate = useNavigate();

  const handleItemClick = (route) => {
    navigate(route);
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
          onClick={() => handleItemClick("/home")}
        >
          <Home />
          <span className="text-xs mt-1">Home</span>
        </li>
        <li
          className={`
            flex flex-col items-center justify-center
            px-4 py-2 cursor-pointer transition-colors
            ${active === "profile" ? "text-blue-500" : "text-gray-500 hover:text-blue-500"}
          `}
          onClick={() => handleItemClick("/profile")}
        >
          <User />
          <span className="text-xs mt-1">Profile</span>
        </li>
        <li
          className={`
            flex flex-col items-center justify-center
            px-4 py-2 cursor-pointer transition-colors
            ${active === "settings" ? "text-blue-500" : "text-gray-500 hover:text-blue-500"}
          `}
          onClick={() => handleItemClick("/settings")}
        >
          <Settings />
          <span className="text-xs mt-1">Settings</span>
        </li>
      </ul>
    </nav>
  );
}
