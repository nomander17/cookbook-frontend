import { useState } from "react";
import Notification from "../../components/Notifications";

export const ForgotPasswordForm = ({
  setCurrentForm,
  notification,
  showNotification,
  hideNotification,
}) => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // forgot password submission logic here
    console.log("Forgot password form submitted");
    console.log("Form Data:", formData);
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

  return (
    <div className="md:w-1/2 px-8 md:px-16 text-offwhite">
      {notification && (
        <Notification
          content={notification.content}
          category={notification.category}
          onClose={hideNotification}
        />
      )}
      <h2 className="font-bold text-2xl">Forgot Password</h2>
      <p className="text-xs mt-4">Enter your email to reset your password</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="p-2 mt-8 text-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 invalid:focus:ring-red-600"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleEmailChange(e)}
          required
        />
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
