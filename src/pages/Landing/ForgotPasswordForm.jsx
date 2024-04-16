import { useState } from "react";

export const ForgotPasswordForm = ({ setCurrentForm }) => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // forgot password submission logic here
    console.log("Forgot password form submitted");
    console.log("Form Data:", formData);
  };

  return (
    <div className="md:w-1/2 px-8 md:px-16 text-offwhite">
      <h2 className="font-bold text-2xl">Forgot Password</h2>
      <p className="text-xs mt-4">Enter your email to reset your password</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="p-2 mt-8 rounded-xl border text-stone-700"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          required />
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
          onClick={() => setCurrentForm("login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};
