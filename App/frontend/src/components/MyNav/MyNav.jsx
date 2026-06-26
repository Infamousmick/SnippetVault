import { useLocation, Link } from "react-router-dom";
import { Container, Dropdown } from "react-bootstrap";
import {
  Code,
  Plus,
  Search,
  User,
  Bookmark,
  Settings,
  LogOut,
} from "lucide-react";
import MyButton from "../MyButton/MyButton";
import "./MyNav.css";
import { useState } from "react";

const MyNav = () => {
  const location = useLocation();
  const [isLogged, setIsLogged] = useState(false);
  const Links = [
    { id: 0, href: "/", label: "Feed" },
    { id: 1, href: "/profile", label: "Profile" },
  ];

  return (
    <header className="my-header sticky-top">
      <Container className="d-flex align-items-center h-100 gap-2 gap-sm-3 px-3">
        <Link
          to="/"
          className="my-logo d-flex align-items-center gap-2 flex-shrink-0"
        >
          <span className="logo-icon d-flex align-items-center justify-content-center">
            <Code size={18} />
          </span>
          <span className="logo-text d-none d-sm-inline">
            Snippet<span className="vault">Vault</span>
          </span>
        </Link>

        <nav className="d-none d-md-flex align-items-center gap-2">
          {Links.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.id}
                to={link.href}
                className={`custom-nav-link ${isActive ? "active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="search-wrapper position-relative ms-auto w-100">
          <Search className="search-icon pe-none position-absolute" size={14} />
          <input
            type="text"
            className="search-input w-100"
            placeholder="Search snippets, tags, people..."
            aria-label="Search snippets"
          />
        </div>

        <MyButton className="flex-shrink-0">
          <Plus size={18} />
          <span className="d-none d-sm-inline">New Snippet</span>
        </MyButton>

        <Dropdown align="end" className="flex-shrink-0">
          <Dropdown.Toggle as="div" className="avatar-toggle">
            <img src="https://placehold.co/32" alt="User Avatar" />
          </Dropdown.Toggle>

          <Dropdown.Menu className="custom-dropdown-menu mt-2">
            <div className="px-3 py-2">
              <div className="dropdown-user-name">Infamousmick</div>
            </div>

            <Dropdown.Divider className="custom-divider" />

            <Dropdown.Item
              as={Link}
              to="/profile"
              className="custom-dropdown-item"
            >
              <User size={16} className="me-2" /> Profile
            </Dropdown.Item>

            <Dropdown.Item
              as={Link}
              to="/saved"
              className="custom-dropdown-item"
            >
              <Bookmark size={16} className="me-2" /> Saved
            </Dropdown.Item>

            <Dropdown.Item
              as={Link}
              to="/settings"
              className="custom-dropdown-item"
            >
              <Settings size={16} className="me-2" /> Settings
            </Dropdown.Item>

            <Dropdown.Divider className="custom-divider" />

            {isLogged && (
              <Dropdown.Item
                as={Link}
                to="/login"
                className="custom-dropdown-item logout-item"
              >
                {" "}
                <LogOut size={16} className="me-2" /> Log out
              </Dropdown.Item>
            )}

            {!isLogged && (
              <Dropdown.Item
                as={Link}
                to="/login"
                className="custom-dropdown-item login-item"
              >
                {" "}
                <LogOut size={16} className="me-2" /> Log in
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </header>
  );
};

export default MyNav;
