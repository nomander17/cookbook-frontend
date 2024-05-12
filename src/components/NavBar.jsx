import { Link } from "react-router-dom";
import Logo from "./../assets/logo-no-background.png";
import { useState } from "react";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-foreground p-5 flex justify-between items-center">
      <img src={Logo} alt="Company Logo" className="w-40" />
      <div className="hidden md:flex space-x-4">
        <Link to="/home" className="text-white">
          Home
        </Link>
        <Link to="/admin" className="text-white">
          Admin
        </Link>
      </div>
      <button
        className="md:hidden focus:outline-none"
        onClick={toggleMobileMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-0 md:hidden bg-foreground p-5 rounded-lg">
          <Link to="/home" className="block mb-2 text-white">
            Home
          </Link>
          <Link to="/admin" className="block text-white">
            Admin
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavBar;
