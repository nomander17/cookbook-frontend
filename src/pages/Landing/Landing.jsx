import { useState } from "react";

import LandingBook from "./../../assets/landing_book.jpg";
import NavBar from "../../components/NavBar";

const Landing = () => {
  const [currentForm, setCurrentForm] = useState("login");

  const renderForm = () => {
    switch (currentForm) {
      case "login":
        return <LoginForm setCurrentForm={setCurrentForm} />;
      case "register":
        return <RegistrationForm setCurrentForm={setCurrentForm} />;
      case "forgotPassword":
        return <ForgotPasswordForm setCurrentForm={setCurrentForm} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <section className="bg-background max-h-screen flex-grow flex items-center justify-center">
        <div className="bg-foreground flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          {renderForm()}
          <div className="md:block hidden w-1/2">
            <img alt="logo" className="rounded-xl" src={LandingBook}></img>
          </div>
        </div>
      </section>
    </div>
  );
};

const LoginForm = ({ setCurrentForm }) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // login handle
    console.log("Login submit pressed");
  };

  return (
    <div className="md:w-1/2 px-8 md:px-16 text-offwhite">
      <h2 className="font-bold text-2xl">Login</h2>
      <p className="text-xs mt-4">If you are already a member, easily log in</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="p-2 mt-8 rounded-xl border text-stone-700"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <div className="relative">
          <input
            className="p-2 rounded-xl border w-full text-stone-700"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="gray"
            className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
            viewBox="0 0 16 16"
          >
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
          </svg>
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
        onClick={() => setCurrentForm("register")}
      >
        Register
      </button>
      <hr className="border-text-zinc-50 mt-5" />
      <div className="mt-3 text-xs flex justify-between items-center">
        <p>Forgot password?</p>
        <button
          className="py-2 px-3 border rounded-xl hover:scale-105 duration-300"
          onClick={() => setCurrentForm("forgotPassword")}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

const RegistrationForm = ({ setCurrentForm }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    // forgot password submission logic here
    console.log("Register button clicked");
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
          required
        />
        <input
          className="p-2 rounded-xl border text-stone-700"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <div className="relative">
          <input
            className="p-2 rounded-xl border w-full text-stone-700"
            type="password"
            name="password"
            placeholder="Password"
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
        <button className="bg-accent rounded-xl text-zinc-50 py-2 hover:scale-105 duration -300">
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

const ForgotPasswordForm = ({ setCurrentForm }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // forgot password submission logic here
    console.log("Forgot password form submitted");
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
          onClick={() => setCurrentForm("login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Landing;