import { useState, useEffect } from "react";
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
import "./Register.css";
import { Container } from "react-bootstrap";

import CustomAlert from "../../components/CustomAlert/CustomAlert";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Mail, KeyRound, AtSign } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const oauths = [
    { id: 0, name: "github", icon: FaGithub, label: "Continue with GitHub" },
    { id: 1, name: "google", icon: FcGoogle, label: "Continue with Google" },
  ];

  const handleOAuthLogin = (provider) => {
    window.location.href = `${import.meta.env.VITE_APP_SERVERURL}/oauth/${provider}`;
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isRegistered) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isRegistered, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVERURL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            username: formData.username,
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

      setIsRegistered(true);
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
              <MyCardTitle>
                Welcome to Snippet<span className="vault">Vault</span>
              </MyCardTitle>
              <MyCardDescription>
                Accedi al tuo account SnippetVault
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

              {err && <CustomAlert text={err} type="danger" />}
              {isRegistered && (
                <CustomAlert text="Registered successfully!" type="success" />
              )}

              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column gap-3"
              >
                <div className="position-relative">
                  <Mail size={18} className="auth-input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="snippetvault@gmail.com"
                    className="auth-input w-100"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="position-relative">
                  <AtSign size={18} className="auth-input-icon" />
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    className="auth-input w-100"
                    value={formData.username}
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
                  Register
                </MyButton>
              </form>
            </MyCardContent>

            <MyCardFooter className="justify-content-center gap-1">
              <span className="auth-footer-text">Have an account?</span>
              <Link to="/login" className="auth-link">
                Log in
              </Link>
            </MyCardFooter>
          </MyCard>
        </Container>
      </div>
    </BaseLayout>
  );
};

export default Register;
