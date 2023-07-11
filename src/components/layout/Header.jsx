import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import LoginIcon from "./Login/LoginIcon";

const Header = () => {
  return (
    <div className="header">
      <h2 className="header-text">Header</h2>
      <nav className="navigation">
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>Home</li>
          </Link>
          <Link to="/UploadComp" style={{ textDecoration: "none" }}>
            <li>Upload</li>
          </Link>
        </ul>
      </nav>
      <div className="user-icon">
        <LoginIcon />
      </div>
    </div>
  );
};

export default Header;
