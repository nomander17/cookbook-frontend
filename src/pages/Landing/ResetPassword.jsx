import { useState } from "react";
import Notification from "../../components/Notifications";
import axios from "../../api/axios";
import { Eye, EyeOff } from "lucide-react";

export const ResetPassword = ({
  setCurrentForm,
  notification,
  showNotification,
  hideNotification,
  resetPasswordAuth,
}) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Reset password form submitted");
    if (formData.newPassword !== formData.confirmPassword) {
      showNotification("error", "Passwords do not match");
      return;
    } else if (formData.confirmPassword.length < 8) {
      showNotification("error", "Password must be at least 8 characters.");
      return;
    }
    try {
      const response = await axios.post(
        `/auth/reset-password`,
        {
          password: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${resetPasswordAuth}`,
          },
        }
      );
      console.log(response.data);
      setCurrentForm("login");
      showNotification("success", "Password reset successful.");
    } catch (error) {
      showNotification("error", error.response.data);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      <h2 className="font-bold text-2xl">Reset Password</h2>
      <p className="text-xs mt-4">Enter your new password</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <input
            className="p-2 mt-8 text-stone-700 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            type={showPassword ? "text" : "password"}
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={(e) => handleInputChange(e)}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-8"
          >
            {showPassword ? (
              <EyeOff size={16} color="gray" />
            ) : (
              <Eye size={16} color="gray" />
            )}
          </button>
        </div>
        <div className="relative">
          <input
            className="p-2 text-stone-700 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange(e)}
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
        <button
          type="submit"
          className="bg-accent rounded-xl text-zinc-50 py-2 hover:scale-105 duration-300"
        >
          Reset Password
        </button>
      </form>
      <hr className="border-offwhite mt-5"></hr>
      <div className="mt-3 text-xs flex justify-between items-center">
        <p>Remember your password?</p>
        <button
          className="py-2 px-3 border rounded-xl hover:scale-105 duration-300"
          onClick={() => {
            setCurrentForm("login");
            showNotification();
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};
