import { useState, useContext, useEffect } from "react";
import { Container, Tab, Nav, Row, Col } from "react-bootstrap";
import {
  ShieldAlert,
  KeyRound,
  Lock,
  AlertTriangle,
  CheckCircle2,
  User,
  Sparkles,
} from "lucide-react";
import "./SettingsPage.css";
import BaseLayout from "../../Layout/BaseLayout";
import MyButton from "../../components/MyButton/MyButton";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const SettingsPage = () => {
  const { isLoggedIn, user, isOauth, updateUser } = useContext(AuthContext);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);

  const [uiMessage, setUiMessage] = useState({ type: null, text: "" });
  const [isLoading, setIsLoading] = useState(false);

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setUiMessage({ type: null, text: "" });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setUiMessage({ type: "error", text: "New passwords do not match!" });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setUiMessage({
        type: "error",
        text: "New password must be at least 8 characters long.",
      });
      return;
    }

    setIsLoading(true);

    const token = localStorage.getItem("token");

    try {
      if (isOauth) {
        throw new Error("Oauth users cannot modify password");
      } else if (!isLoggedIn) {
        throw new Error("You must be logged in!");
      }

      const { oldPassword, newPassword } = passwordData;
      const payload = { oldPassword, newPassword };

      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVERURL}/auth/password`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error while updating the password..");
      }

      setUiMessage({ type: "success", text: data.message });

      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setUiMessage({ type: "error", text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();

    if (!avatarFile) return;

    setIsLoading(true);
    setUiMessage({ type: null, text: "" });

    try {
      const token = localStorage.getItem("token");
      const userId = user._id;
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVERURL}/users/${userId}/avatar`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error while uploading the avatar..");
      }

      setUiMessage({ type: "success", text: data.message });
      updateUser(data.user);
    } catch (error) {
      setUiMessage({ type: "error", text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseLayout>
      <Container className="py-5">
        <h2 className="settings-page-title mb-4">Account Settings</h2>

        <Tab.Container id="settings-tabs" defaultActiveKey="security">
          <Row>
            <Col lg={3} className="mb-4 mb-lg-0">
              <Nav
                variant="pills"
                className="flex-row flex-lg-column flex-nowrap overflow-auto settings-sidebar gap-2"
              >
                <Nav.Item>
                  <Nav.Link
                    eventKey="security"
                    className="d-flex align-items-center gap-2 text-nowrap flex-shrink-0"
                  >
                    <ShieldAlert size={18} /> Security
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    eventKey="account"
                    className="d-flex align-items-center gap-2 text-nowrap flex-shrink-0"
                  >
                    <User size={18} /> Account
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    eventKey="ai"
                    className="d-flex align-items-center gap-2 text-nowrap flex-shrink-0"
                  >
                    <Sparkles size={18} /> AI Integrations
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>

            <Col lg={9}>
              <Tab.Content className="settings-content-card">
                <Tab.Pane eventKey="security">
                  {!isOauth ? (
                    <>
                      <div className="mb-4">
                        <h4 className="settings-section-title mb-2">
                          Change Password
                        </h4>
                        <p className="settings-section-desc mb-0">
                          Ensure your account is using a long, random password
                          to stay secure.
                        </p>
                      </div>
                      <form
                        onSubmit={handlePasswordSubmit}
                        className="d-flex flex-column gap-3 max-w-md"
                      >
                        <div className="form-group">
                          <label
                            htmlFor="oldPassword"
                            className="settings-label"
                          >
                            <Lock size={14} /> Current Password
                          </label>
                          <input
                            type="password"
                            id="oldPassword"
                            name="oldPassword"
                            className="settings-input"
                            placeholder="Enter current password"
                            value={passwordData.oldPassword}
                            onChange={handlePasswordChange}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="newPassword"
                            className="settings-label"
                          >
                            <KeyRound size={14} /> New Password
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            className="settings-input"
                            placeholder="Min. 8 characters"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="confirmPassword"
                            className="settings-label"
                          >
                            <KeyRound size={14} /> Confirm New Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="settings-input"
                            placeholder="Repeat new password"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            required
                          />
                        </div>

                        {uiMessage.text && (
                          <div
                            className={`settings-message ${uiMessage.type} mt-2`}
                          >
                            {uiMessage.type === "error" ? (
                              <AlertTriangle size={16} />
                            ) : (
                              <CheckCircle2 size={16} />
                            )}
                            <span>{uiMessage.text}</span>
                          </div>
                        )}

                        <div className="mt-3">
                          <MyButton
                            type="submit"
                            disabled={isLoading}
                            className="px-4"
                          >
                            {isLoading ? "Updating..." : "Update Password"}
                          </MyButton>
                        </div>
                      </form>
                    </>
                  ) : (
                    <div className="oauth-info-box">
                      <div className="oauth-icon-wrapper">
                        <ShieldAlert size={48} />
                      </div>
                      <h4 className="settings-section-title mb-3">
                        External Safety Management
                      </h4>
                      <p className="settings-section-desc mb-0 max-w-md mx-auto">
                        Your account is linked via an OAuth provider. For
                        security reasons, your credentials are managed directly
                        by the originating platform. No local password is stored
                        on our servers.
                      </p>
                    </div>
                  )}
                </Tab.Pane>

                <Tab.Pane eventKey="account">
                  <div className="mb-4">
                    <h4 className="settings-section-title mb-2">
                      Account Settings
                    </h4>
                    <p className="settings-section-desc mb-0">
                      Update your avatar and personal details here.
                    </p>
                  </div>

                  <form
                    onSubmit={handleAvatarSubmit}
                    className="d-flex flex-column gap-3 max-w-md"
                  >
                    <div className="form-group">
                      <label htmlFor="avatarUpload" className="settings-label">
                        <User size={14} /> Profile Picture
                      </label>

                      <label
                        htmlFor="avatarUpload"
                        className="settings-input settings-file-upload-label d-flex align-items-center justify-content-center text-secondary m-0"
                      >
                        {avatarFile
                          ? avatarFile.name
                          : "Click to choose an image 📸"}
                      </label>

                      <input
                        type="file"
                        id="avatarUpload"
                        accept="image/jpeg, image/png, image/webp"
                        className="d-none"
                        onChange={handleFileChange}
                      />
                    </div>

                    {uiMessage.text && (
                      <div
                        className={`settings-message ${uiMessage.type} mt-2`}
                      >
                        {uiMessage.type === "error" ? (
                          <AlertTriangle size={16} />
                        ) : (
                          <CheckCircle2 size={16} />
                        )}
                        <span>{uiMessage.text}</span>
                      </div>
                    )}

                    <div className="mt-3">
                      <MyButton
                        type="submit"
                        disabled={isLoading || !avatarFile}
                        className="px-4"
                      >
                        {isLoading ? "Uploading..." : "Upload Avatar"}
                      </MyButton>
                    </div>
                  </form>
                </Tab.Pane>

                <Tab.Pane eventKey="ai">
                  <h4 className="settings-section-title mb-2">
                    Gemini AI Configuration
                  </h4>
                  <p className="settings-section-desc mb-0">
                    Set your personal API Key to enable AI code generation.
                  </p>
                  <div className="coming-soon-badge mt-4">🚀 Coming in V2</div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </BaseLayout>
  );
};

export default SettingsPage;
