import { useState } from "react";
import request from "../../axiosHelper";
import Notification from "../../components/Notifications";
import { Eye, EyeOff } from 'lucide-react';

export const LoginForm = ({
  setCurrentForm,
  notification,
  setNotification,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login submit pressed");
    console.log("Form Data:", formData);
    await request
      .post("/auth/login", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="md:w-1/2 px-8 md:px-16 text-offwhite">
      {notification && (
        <Notification
          content={notification.content}
          category={notification.category}
        />
      )}
      <h2 className="font-bold text-2xl">Login</h2>
      <p className="text-xs mt-4">If you are already a member, easily log in</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="p-2 mt-8 rounded-xl border text-stone-700"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          required
        />
        <div className="relative">
          <input
            className="p-2 rounded-xl border w-full text-stone-700"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            required
          />
          <button 
            type="button" 
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {showPassword ? <EyeOff size={16} color="gray" /> : <Eye size={16} color="gray" />}
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
          setNotification({});
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
            setNotification({});
          }}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};