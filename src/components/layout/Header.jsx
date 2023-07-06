import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { FaUserCircle } from "react-icons/fa";

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
      <FaUserCircle className="user-icon" />
    </div>
  );
};

export default Header;
