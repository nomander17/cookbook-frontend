import { useState } from "react";
import Notification from "../../components/Notifications";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useAuthUserContext } from "../../context/AuthUserContext";

const BASE_URL = "http://localhost:8090/api";

export const LoginForm = ({
  setCurrentForm,
  notification,
  showNotification,
  hideNotification,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const signIn = useSignIn();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setAuthUser } = useAuthUserContext();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUsernameChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login submit pressed");
    console.log("Form Data:", formData);
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, formData);
      const jwtToken = response.data.jwtToken;
      signIn({
        auth: {
          token: jwtToken,
          tokenType: "Bearer",
        },
      });
      setAuthUser({
        username: response.data.username,
        userId: response.data.userId,
      });
      const isAdmin = async() => {
        return await axios.get(`${BASE_URL}/auth/is-admin`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });
      }
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(error.response.status);
        showNotification("error", "Invalid username or password.");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="md:w-1/2 px-8 md:px-16 text-offwhite">
      {notification && (
        <Notification
          content={notification.content}
          category={notification.category}
          onClose={hideNotification}
        />
      )}
      <h2 className="font-bold text-2xl">Login</h2>
      <p className="text-xs mt-4">If you are already a member, easily log in</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="p-2 mt-8 text-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 invalid:focus:ring-red-600"
          type="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => handleUsernameChange(e)}
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
          Login
        </button>
      </form>
      <div className="mt-6 grid grid-cols-3 items-center">
        <hr className="border-text-zinc-50" />
        <p className="text-center text-sm">OR</p>
        <hr className="border-text-zinc-50" />
      </div>
      <button
        className="border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300"
        onClick={() => {
          setCurrentForm("register");
          showNotification();
        }}
      >
        Register
      </button>
      <hr className="border-text-zinc-50 mt-5" />
      <div className="mt-3 text-xs flex justify-between items-center">
        <p>Forgot password?</p>
        <button
          className="py-2 px-3 border rounded-xl hover:scale-105 duration-300"
          onClick={() => {
            setCurrentForm("forgotPassword");
            showNotification();
          }}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};
