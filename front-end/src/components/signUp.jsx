import React, { useState } from "react";
import axios from "axios";
import { useRef } from "react";
const prodAPI = "https://healthecommerce.herokuapp.com";

const SignUp = (props) => {
  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    phoneNumberNumber: "",
    age: "",
    password: "",
    userRole: "user",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const signupModalRef = useRef(null);

  const [errors, setErrors] = useState({
    // name: "",
    // email: "",
    // phoneNumberNumber: "",
    // age: "",
    // password: "",
    // userRole: "user",
  });

  const handleChange = (e) => {
    if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    } else {
      let cloneUserReg = { ...userRegister };
      cloneUserReg[e.target.name] = e.target.value;
      setUserRegister(cloneUserReg);
      console.log(cloneUserReg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateRegisteration();
    if (!errors) {
      const signupResponse = await axios.post(`${prodAPI}/users`, userRegister);
      console.log("signupResponse: ", signupResponse);

      if (signupResponse.status === 201) {
        signupModalRef.current.click();
        props.checkLoginDetails({
          email: userRegister.email,
          password: userRegister.password,
          rememberLogin: true,
        });
      }
    } else {
      return;
    }
  };

  const validateRegisteration = () => {
    let error = {};
    const nameRegex = /^[A-Z][A-Za-z\s]{3,}[\.]{0,1}[A-Z][A-Za-z\s]{2,}$/;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+[^.]([\-]?\w+)*(\.\w{2,})+$/;
    const phoneNumberRegex = /[0][1][0-2,5][,0-9]{8}$/; //[0-2] equavielnt to => [^3-9]
    const ageRegex = /^\d{2,}$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    // ^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$
    if (!nameRegex.test(userRegister.name.trim())) {
      error.name =
        "Enter a valid Name, 1st & 2nd, at least 3 characters for each";
    }
    if (!emailRegex.test(userRegister.email.trim())) {
      error.email = "Enter a valid Email, example@ehealth.com";
    }
    if (!phoneNumberRegex.test(userRegister.phoneNumber.trim())) {
      error.phoneNumber =
        "Enter a valid mobile phoneNumber, 11 numbers in Egypt";
    }
    if (!ageRegex.test(userRegister.age.trim())) {
      error.age = "Enter a correct age in numbers";
    }
    if (!passwordRegex.test(userRegister.password.trim())) {
      error.password =
        "Enter a valild password, at leat 8 charcters, must include one number, one char, one special char";
    }
    if (confirmPassword.trim() !== userRegister.password.trim()) {
      error.confirmPassword = "Please enter the same password";
    }
    setErrors(error);
    return Object.keys(error).length ? error : null;
  };

  return (
    <React.Fragment>
      <div
        className="modal fade"
        id="signupModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Sign Up Detials:
              </h5>
              <button
                type="button"
                ref={signupModalRef}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="container">
              <form onSubmit={handleSubmit} className=" mx-auto">
                <div className="modal-body">
                  <div className="row row-cols-2">
                    <div className="mb-3 col-6 mx-auto">
                      <label htmlFor="inputName" className="form-label">
                        Full Name
                      </label>
                      <input
                        name="name"
                        value={userRegister.name}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="inputName"
                        aria-describedby="emailHelp"
                      ></input>
                      {errors.name && (
                        <div className="text-danger">{errors.name}</div>
                      )}
                    </div>
                    <div className="mb-3 col-6 mx-auto">
                      <label htmlFor="inputEmail" className="form-label">
                        Email address
                      </label>
                      <input
                        name="email"
                        value={userRegister.email}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      ></input>
                      {errors.email && (
                        <div className="text-danger">{errors.email}</div>
                      )}
                    </div>

                    <div className="mb-3 col-6 mx-auto">
                      <label htmlFor="inputPhoneNumber" className="form-label">
                        Phone Number
                      </label>
                      <input
                        name="phoneNumber"
                        value={userRegister.phoneNumber}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="inputPhoneNumber"
                      ></input>
                      {errors.phoneNumber && (
                        <div className="text-danger">{errors.phoneNumber}</div>
                      )}
                    </div>
                    <div className="mb-3 col-6 mx-auto">
                      <label htmlFor="inputAge" className="form-label">
                        Age
                      </label>
                      <input
                        name="age"
                        value={userRegister.age}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="inputAge"
                      ></input>
                      {errors.age && (
                        <div className="text-danger">{errors.age}</div>
                      )}
                    </div>
                    <div className="mb-3 col-6 mx-auto">
                      <label htmlFor="inputPassword" className="form-label">
                        Password
                      </label>
                      <input
                        name="password"
                        value={userRegister.password}
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                        id="inputPassword"
                      ></input>
                      {errors.password && (
                        <div className="text-danger">{errors.password}</div>
                      )}
                    </div>
                    <div className="mb-3 col-6 mx-auto">
                      <label
                        htmlFor="inputPasswordConfirm"
                        className="form-label"
                      >
                        Confrim Password
                      </label>
                      <input
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                        id="inputPasswordConfirm"
                      ></input>
                      {errors.confirmPassword && (
                        <div className="text-danger">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="modal-footer justify-content-start">
                  <button type="submit" className="btn btn-primary px-5">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
