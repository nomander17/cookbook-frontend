import { useState } from "react";
import request from "../../axiosHelper";

export const RegistrationForm = ({ setCurrentForm, notification, setNotification }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await request.post("/user/register", formData);
      console.log(response);
      if (response.status===200 && response.data.success) {
        handleRegisterSuccess(response);
      }
    } catch (error) {
      setNotification("Something went wrong. Please try again later.")
    }
  };

  const handleRegisterSuccess = (response) => {
    localStorage.setItem("token", response.data.token);
    setCurrentForm("login");
    setNotification({
      category: "success",
      content: "Registration successful. Please login."
    });
  };

  return (
    <div className="md:w-1/2 px-8 md:px-16 text-zinc-50">
      <h2 className="font-bold text-2xl">Register</h2>
      <p className="text-xs mt-4">Register as a new user</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="p-2 mt-8 rounded-xl border text-stone-700"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          required
        />
        <input
          className="p-2 rounded-xl border text-stone-700"
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
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            required
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="gray"
            className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
            viewBox="0 0 16 16"
            onClick={() => alert("Password toggle req")}
          >
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
          </svg>
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
          onClick={() => setCurrentForm("login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};
