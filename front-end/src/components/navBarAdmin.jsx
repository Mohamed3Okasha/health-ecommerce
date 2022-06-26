import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Login from "./login";
import SignUp from "./signUp";

const NavBarAdmin = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    props.handleLogout();
    if (location.pathname !== "/") navigate("/home");
  };
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark text-muted px-5 pt-3 pb-2">
      <div className="container-fluid">
        <Link className="navbar-brand mb-sm-3" to="/">
          Logo
        </Link>
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-nav"
          aria-controls="main-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="main-nav">
          <div className="navbar-nav me-auto mb-lg-2 ">
            <Link className="nav-link" aria-current="page" to="/">
              Home
            </Link>
          </div>

          {props.logedUser.name && (
            <div className="d-flex justify-content-evenly ps-5">
              <Link
                to="/dashboard/statistics"
                role="button"
                className="btn btn-primary me-4"
              >
                Dashboard
              </Link>

              <button
                type="button"
                className="btn btn-secondary me-4"
                onClick={handleLogout}
              >
                Logout
              </button>
              <span className="text-white mt-1">
                Welcome, {props.logedUser.name.split(" ")[0]}
              </span>
            </div>
          )}
          {!props.logedUser.name && (
            <div>
              <button
                type="button"
                className="btn btn-primary me-4"
                data-bs-toggle="modal"
                data-bs-target="#signupModal"
              >
                Sign Up
              </button>
              <SignUp />

              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                Login
              </button>

              <Login
                checkLoginDetails={props.checkLoginDetails}
                logedUser={props.logedUser}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBarAdmin;
