import { useState } from "react";
import Notification from "../../components/Notifications";
import axios from "../../api/axios";

export const VerifyOtp = ({
  setCurrentForm,
  notification,
  showNotification,
  hideNotification,
  otpAuth,
  setResetPasswordAuth
}) => {
  const [formData, setFormData] = useState({
    otp: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("OTP verification form submitted");
    try {
      const response = await axios.post(`/auth/verify-otp`, formData, {
        headers: {
          Authorization: `Bearer ${otpAuth}`,
        },
      });
      console.log(response.data);
      setResetPasswordAuth(response.data.jwtToken);
      showNotification("success", "OTP verified. Please choose a new password.");
      setCurrentForm("resetPassword");
    } catch (error) {
      showNotification("error", error.response.data);
    }
  };

  const handleOtpChange = (e) => {
    const validateOtp = (e) => {
      const onlyNumbers = e.target.value.replace(/\D/g, "");
      if (onlyNumbers.length > 6) {
        e.target.value = onlyNumbers.slice(0, 6);
      } else {
        e.target.value = onlyNumbers;
      }
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    validateOtp(e);
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
      <h2 className="font-bold text-2xl">Verify OTP</h2>
      <p className="text-xs mt-4">Enter the OTP sent to your email</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="p-2 mt-8 text-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="otp"
          placeholder="OTP"
          value={formData.otp}
          onChange={(e) => handleOtpChange(e)}
          required
        />
        <button
          type="submit"
          className="bg-accent rounded-xl text-zinc-50 py-2 hover:scale-105 duration-300"
        >
          Verify OTP
        </button>
      </form>
      <hr className="border-offwhite mt-5"></hr>
      <div className="mt-3 text-xs flex justify-between items-center">
        <p>Didn't receive the OTP?</p>
        <button
          className="py-2 px-3 border rounded-xl hover:scale-105 duration-300"
          onClick={() => {
            setCurrentForm("forgotPassword");
            showNotification();
          }}
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};
