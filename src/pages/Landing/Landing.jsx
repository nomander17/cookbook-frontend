import { useEffect, useState } from "react";
import LandingImage1 from "./../../assets/landing/1.jpg";
import LandingImage2 from "./../../assets/landing/2.jpg";
import LandingImage3 from "./../../assets/landing/3.jpg";
import LandingImage4 from "./../../assets/landing/4.jpg";
import NavBar from "./../../components/NavBar";
import { LoginForm } from "./LoginForm";
import { RegistrationForm } from "./RegistrationForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import useNotification from "../../hooks/useNotification";
import { VerifyOtp } from "./VerifyOtp";
import { ResetPassword } from "./ResetPassword";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const Landing = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const { notification, showNotification, hideNotification } =
    useNotification();
  const [currentImage, setCurrentImage] = useState(LandingImage1);
  const [isImageActive, setIsImageActive] = useState(true);
  const [otpAuth, setOtpAuth] = useState("");
  const [resetPasswordAuth, setResetPasswordAuth] = useState("");
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  useEffect(() => {
    if (authHeader) {
      const verifyAuth = async () => {
        try {
          const response = await axios.get(`/auth/is-admin`, {
            headers: {
              Authorization: authHeader,
            },
          });
          if (response.status === 200 && response.data === false) {
            navigate("/home");
          } else if (response.status === 200 && response.data === true) {
            navigate("/admin");
          }
        } catch (error) {}
      };
      verifyAuth();
    }
  }, []);

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
            showNotification={showNotification}
            hideNotification={hideNotification}
          />
        );
      case "register":
        return (
          <RegistrationForm
            setCurrentForm={setCurrentForm}
            notification={notification}
            showNotification={showNotification}
            hideNotification={hideNotification}
          />
        );
      case "forgotPassword":
        return (
          <ForgotPasswordForm
            setCurrentForm={setCurrentForm}
            notification={notification}
            showNotification={showNotification}
            hideNotification={hideNotification}
            setOtpAuth={setOtpAuth}
          />
        );
      case "verifyOtp":
        return (
          <VerifyOtp
            setCurrentForm={setCurrentForm}
            notification={notification}
            showNotification={showNotification}
            hideNotification={hideNotification}
            otpAuth={otpAuth}
            setResetPasswordAuth={setResetPasswordAuth}
          />
        );
      case "resetPassword":
        return (
          <ResetPassword
            setCurrentForm={setCurrentForm}
            notification={notification}
            showNotification={showNotification}
            hideNotification={hideNotification}
            resetPasswordAuth={resetPasswordAuth}
          />
        );
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
            <img
              className={`rounded-xl w-[360px] h-[450px] image-transition ${
                isImageActive ? "active" : ""
              }`}
              src={currentImage}
            ></img>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
