

import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
  const { user,  logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <i className="fa-solid fa-landmark"></i>
          <h2>CitiSolve</h2>
        </Link>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <div className="nav-links">
              <NavLink to='/complaintForm' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Submit complaint</NavLink>
              
              <NavLink
                to="/my-complaints"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                My Complaints
              </NavLink>
            </div>

            <span className="welcome-text">Welcome, {user}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn login-btn">Login</Link>
            <Link to="/register" className="nav-btn register-btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


