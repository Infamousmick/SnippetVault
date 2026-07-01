import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import OauthSuccess from "./pages/OauthSuccess/OauthSuccess";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import { SnippetProvider } from "./context/SnippetContext/SnippetContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <SnippetProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/oauth/success/" element={<OauthSuccess />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <div>Profile</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <div>Settings</div>
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </SnippetProvider>
      </AuthProvider>
    </>
  );
}

export default App;
