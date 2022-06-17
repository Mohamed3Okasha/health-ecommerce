import React from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Login from "./login";
import SignUp from "./signUp";

const NavBar = (props) => {
  console.log("NavBar - props", props);
  const loginButtonRef = useRef(null);
  if (props.forceLogin) {
    loginButtonRef.current.click();
  }
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark text-muted">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Logo
        </Link>
        {/* <button className = "navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav"
                    aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className = "navbar-toggler-icon"></span>
                </button> */}
        <div
          className="collapse navbar-collapse justify-content-center"
          id="main-nav"
        >
          <div className="navbar-nav me-auto mb-lg-2 ">
            <Link className="nav-link" aria-current="page" to="/">
              Home
            </Link>
            <Link className="nav-link " to="/">
              Contact
            </Link>
            <Link to="/cart">
              <span className="badge bg-primary p-1">
                {" "}
                <i className="bi bi-cart-check lg fs-4"></i>{" "}
                {props.productCount}{" "}
              </span>
            </Link>
          </div>

          <div className="d-flex me-5">
            {props.logedUser.name && (
              <div>
                <button
                  type="button"
                  className="btn btn-secondary me-4"
                  onClick={props.handleLogout}
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
                <SignUp />

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
