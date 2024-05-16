import { useState } from "react";
import Notification from "../../components/Notifications";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const BASE_URL = "http://localhost:8090/api";

export const RegistrationForm = ({ setCurrentForm, notification, showNotification, hideNotification }) => {
  const [formData, setFormData] = useState({
    userName: "",
    name: "",
    email: "",
    password: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handlePasswordChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const validatePassword = (e) => {
      const password = e.target.value;
      if (password.length < 8) {
        e.target.setCustomValidity(
          "Password must be at least 8 characters long."
        );
      } else {
        e.target.setCustomValidity("");
      }
    };
    validatePassword(e);
  };

  const handleEmailChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const validateEmail = (e) => {
      const email = e.target.value;
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      if (!emailRegex.test(email)) {
        e.target.setCustomValidity("Please enter a valid email address.");
      } else {
        e.target.setCustomValidity("");
      }
    };
    validateEmail(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, formData);
      console.log(response);
      if (response.status === 200) {
        handleRegisterSuccess(response);
      } else if (response.status === 400) {
        
      }
    } catch (error) {
      showNotification("error", error.response.data);
    }
  };

  const handleRegisterSuccess = (response) => {
    setCurrentForm("login");
    showNotification("success", "Registration successful. Please login.");
  };

  return (
    <div className="md:w-1/2 px-8 md:px-16 text-zinc-50">
      {notification && (
        <Notification
          content={notification.content}
          category={notification.category}
          hideNotification={hideNotification}
        />
      )}
      <h2 className="font-bold text-2xl">Register</h2>
      <p className="text-xs mt-4">Register as a new user</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="p-2 mt-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-stone-700"
          type="text"
          name="userName"
          placeholder="Username"
          value={formData.userName}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          required
        />
        <input
          className="p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-stone-700"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          required
        />
        <input
          className="p-2 text-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 invalid:focus:ring-red-600"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleEmailChange(e)}
          required
        />
        <div className="relative">
          <input
            className="p-2 rounded-xl w-full text-stone-700  focus:outline-none focus:ring-2 focus:ring-blue-500 invalid:focus:ring-red-600"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handlePasswordChange(e)}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {showPassword ? (
              <EyeOff size={16} color="gray" />
            ) : (
              <Eye size={16} color="gray" />
            )}
          </button>
        </div>
        <button className="bg-accent rounded-xl text-zinc-50 py-2 hover:scale-105 duration-300">
          Register
        </button>
      </form>
      <hr className="border-zinc-50 mt-5"></hr>
      <div className="mt-3 text-xs flex justify-between items-center">
        <p>Have an account?</p>
        <button
          className="py-2 px-3 border rounded-xl hover:scale-105 duration-300"
          onClick={() => {
            setCurrentForm("login");
            showNotification()
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};
