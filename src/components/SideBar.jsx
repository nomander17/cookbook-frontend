import { createContext, useContext, useState } from "react";
import Logo from "./../assets/logo-no-background.png";
import { ExpandIcon, LogOut, Minimize2 } from "lucide-react";

const SideBarContext = createContext();

export function SideBar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-background shadow-md">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={Logo}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt="logo"
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

        <div className="border-t border-gray-600 flex p-3">
          <img
            src="https://ui-avatars.com/api/name=John+Doe?background=0D8ABC&color=fff"
            alt="User avatar"
            className="w-12 h-12 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
            `}
          >
            <div className="leading-4 text-white">
              <h4 className="font-semibold text-sm text-white">John Doe</h4>
              <span className="text-sm text-gray-600">@username</span>
            </div>
            <LogOut color="white" />
          </div>
        </div>
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