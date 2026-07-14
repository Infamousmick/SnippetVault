import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import BaseLayout from "../../Layout/BaseLayout";
import {
  MyCard,
  MyCardHeader,
  MyCardTitle,
  MyCardDescription,
  MyCardContent,
  MyCardFooter,
} from "../../components/MyCard/MyCard";
import MyButton from "../../components/MyButton/MyButton";
import "./Login.css";
import { Container } from "react-bootstrap";

import CustomAlert from "../../components/CustomAlert/CustomAlert";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Mail, KeyRound } from "lucide-react";

const Login = () => {
  const { isLoggedIn, loginUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const oauths = [
    { id: 0, name: "github", icon: FaGithub, label: "Continue with GitHub" },
    { id: 1, name: "google", icon: FcGoogle, label: "Continue with Google" },
  ];

  const handleOAuthLogin = (provider) => {
    window.location.href = `${import.meta.env.VITE_APP_SERVERURL}/oauth/${provider}`;
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVERURL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: formData.identifier,
            password: formData.password,
          }),
        },
      );

      if (!response.ok) {
        const errData = await response.json();

        if (errData.errors && errData.errors.length > 0) {
          const errorList = (
            <ul className="mb-0 text-start">
              {errData.errors.map((errObj, index) => (
                <li key={index}>{errObj.message}</li>
              ))}
            </ul>
          );
          setErr(errorList);
          return;
        }
        throw new Error(errData.message || "Registration failed");
      }
      const { token, user } = await response.json();
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      loginUser(user);
    } catch (error) {
      setErr(error.message || "Errore di connessione");
    }
  };

  return (
    <BaseLayout>
      <div className="auth-page-wrapper d-flex align-items-center justify-content-center min-vh-100">
        <Container className="d-flex justify-content-center">
          <MyCard className="auth-card">
            <MyCardHeader className="text-center pb-0">
              <MyCardTitle>Welcome back</MyCardTitle>
              <MyCardDescription>
                Login to your SnippetVault's account
              </MyCardDescription>
            </MyCardHeader>

            <MyCardContent className="pt-4">
              <div className="d-flex flex-column gap-2 mb-4">
                {oauths.map((oauth) => {
                  const Icon = oauth.icon;
                  return (
                    <button
                      key={oauth.id}
                      className="oauth-btn"
                      onClick={() => handleOAuthLogin(oauth.name)}
                    >
                      <Icon size={18} /> {oauth.label}
                    </button>
                  );
                })}
              </div>

              <div className="auth-divider">
                <span>or continue with your email</span>
              </div>

              {err && (
                <div className="mb-2">
                  <CustomAlert text={err} type="danger" />
                </div>
              )}
              {isLoggedIn && (
                <div className="mb-2">
                  <CustomAlert text="Login successfully!" type="success" />
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column gap-3"
              >
                <div className="position-relative">
                  <Mail size={18} className="auth-input-icon" />
                  <input
                    type="text"
                    name="identifier"
                    placeholder="email or username"
                    className="auth-input w-100"
                    value={formData.identifier}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="position-relative">
                  <KeyRound size={18} className="auth-input-icon" />
                  <input
                    type="password"
                    name="password"
                    placeholder="*********"
                    className="auth-input w-100"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <MyButton type="submit" className="w-100 mt-2">
                  Log in
                </MyButton>
              </form>
            </MyCardContent>

            <MyCardFooter className="justify-content-center gap-1">
              <span className="auth-footer-text">Don't have an account?</span>
              <Link to="/register" className="auth-link">
                Register
              </Link>
            </MyCardFooter>
          </MyCard>
        </Container>
      </div>
    </BaseLayout>
  );
};

export default Login;
