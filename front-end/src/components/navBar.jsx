import React from "react";
import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./login";
import SignUp from "./signUp";

const NavBar = (props) => {
  const loginButtonRef = useRef(null);
  if (props.forceLogin) {
    loginButtonRef.current.click();
  }
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    props.handleLogout();
    if (location.pathname !== "/") navigate("/");
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
        <div
          className="collapse navbar-collapse justify-content-center"
          id="main-nav"
        >
          <div className="navbar-nav me-auto mb-lg-2 ">
            <Link className="nav-link" aria-current="page" to="/">
              Home
            </Link>
            <Link className="nav-link " to="/contact-us">
              Contact
            </Link>
            <Link to="/cart">
              <button
                type="button"
                className="btn btn-primary position-relative p-1 mb-3 mb-sm-0"
              >
                {"Cart"}
                <i className="bi bi-cart4 lg fs-4"></i>{" "}
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {props.productCount}{" "}
                  <span className="visually-hidden">Products</span>
                </span>
                {/* <span className="border circle"></span> */}
              </button>
            </Link>
          </div>

          <div className="d-flex me-5">
            {props.logedUser.name && (
              <div>
                <button
                  type="button"
                  className="btn btn-secondary me-4"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <span className="text-white">
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
                <SignUp checkLoginDetails={props.checkLoginDetails} />

                <button
                  ref={loginButtonRef}
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
                  setLogedUser={props.setLogedUser}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
