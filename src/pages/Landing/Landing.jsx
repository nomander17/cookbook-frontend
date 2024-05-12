import { useEffect, useState } from "react";
import LandingImage1 from "./../../assets/landing/1.jpg";
import LandingImage2 from "./../../assets/landing/2.jpg";
import LandingImage3 from "./../../assets/landing/3.jpg";
import LandingImage4 from "./../../assets/landing/4.jpg";
import NavBar from "./../../components/NavBar";
import { LoginForm } from "./LoginForm";
import { RegistrationForm } from "./RegistrationForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

const Landing = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const [notification, setNotification] = useState({
    category: "",
    content: "",
  });
  const [currentImage, setCurrentImage] = useState(LandingImage1);
  const [isImageActive, setIsImageActive] = useState(true);

  useEffect(() => {
    const imageCycle = [
      LandingImage1,
      LandingImage2,
      LandingImage3,
      LandingImage4,
    ];
    let index = 0;
    const interval = setInterval(() => {
      setIsImageActive(false);
      setTimeout(() => {
        index = (index + 1) % imageCycle.length;
        setCurrentImage(imageCycle[index]);
        setIsImageActive(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderForm = () => {
    switch (currentForm) {
      case "login":
        return (
          <LoginForm
            setCurrentForm={setCurrentForm}
            notification={notification}
            setNotification={setNotification}
          />
        );
      case "register":
        return (
          <RegistrationForm
            setCurrentForm={setCurrentForm}
            notification={notification}
            setNotification={setNotification}
          />
        );
      case "forgotPassword":
        return (
          <ForgotPasswordForm
            setCurrentForm={setCurrentForm}
            notification={notification}
            setNotification={setNotification}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBar/>
      <section className="bg-background max-h-screen flex-grow flex items-center justify-center">
        <div className="bg-foreground flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          {renderForm()}
          <div className="md:block hidden w-1/2">
            <img 
            alt="cool"
            className={`rounded-xl w-[360px] h-[450px] image-transition ${
              isImageActive ? "active" : ""
            }`}
            src={currentImage}></img>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
