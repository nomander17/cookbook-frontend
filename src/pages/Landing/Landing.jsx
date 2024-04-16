import { useState } from "react";
import LandingBook from "./../../assets/landing_book.jpg";
import NavBar from "../../components/NavBar";
import { LoginForm } from "./LoginForm";
import { RegistrationForm } from "./RegistrationForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

const Landing = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const [notification, setNotification] = useState({category: "", content: ""});
  // message = { category: "error/success", content: "Hello world."}
  
  const renderForm = () => {
    switch (currentForm) {
      case "login":
        return <LoginForm setCurrentForm={setCurrentForm} notification={notification} setNotification={setNotification} />;
      case "register":
        return <RegistrationForm setCurrentForm={setCurrentForm} notification={notification} setNotification={setNotification} />;
      case "forgotPassword":
        return <ForgotPasswordForm setCurrentForm={setCurrentForm} notification={notification} setNotification={setNotification} />;
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

export default Landing;
