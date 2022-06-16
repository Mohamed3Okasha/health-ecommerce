import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
const prodAPI = "https://healthecommerce.herokuapp.com";

const Address = (props) => {
  const closeAddressBtnRef = useRef(null);

  const [address, setAddress] = useState({
    street1: "",
    street2: "",
    city: "",
    province: "",
    country: "",
  });

  const handleInputChange = (e) => {
    let cloneAddress = { ...address };
    cloneAddress[e.target.name] = e.target.value;
    setAddress(cloneAddress);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    props.handleAddAddress(address);
    // closeAddressBtnRef.current.click();
  };

  return (
    <React.Fragment>
      <div
        className="modal fade text-dark"
        id="addAddressModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                ref={closeAddressBtnRef}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="container">
              <form onSubmit={handleAddressSubmit} className=" mx-auto">
                <div className="modal-body">
                  <div className="row row-cols-2">
                    <div className="mb-3 col-5 mx-auto">
                      <label htmlFor="inputStreet1" className="form-label">
                        Street 1
                      </label>
                      <input
                        name="street1"
                        value={address.street1}
                        onChange={handleInputChange}
                        type="text"
                        className="form-control"
                        id="inputStreet1"
                        aria-describedby="emailHelp"
                      ></input>
                    </div>
                    <div className="mb-3 col-5 mx-auto">
                      <label htmlFor="inputStreet2" className="form-label">
                        Street 2
                      </label>
                      <input
                        name="street2"
                        value={address.street2}
                        onChange={handleInputChange}
                        type="text"
                        className="form-control"
                        id="inputStreet2"
                        aria-describedby="emailHelp"
                      ></input>
                    </div>

                    <div className="mb-3 col-5 mx-auto">
                      <label htmlFor="inputCity" className="form-label">
                        City
                      </label>
                      <input
                        name="city"
                        value={address.city}
                        onChange={handleInputChange}
                        type="text"
                        className="form-control"
                        id="inputCity"
                      ></input>
                    </div>
                    <div className="mb-3 col-5 mx-auto">
                      <label htmlFor="inputProvince" className="form-label">
                        Province
                      </label>
                      <input
                        name="province"
                        value={address.province}
                        onChange={handleInputChange}
                        type="text"
                        className="form-control"
                        id="inputProvince"
                      ></input>
                    </div>
                    <div className="mb-3 col-5 mx-auto">
                      <label htmlFor="inputCountry" className="form-label">
                        Country
                      </label>
                      <input
                        name="country"
                        value={address.country}
                        onChange={handleInputChange}
                        type="text"
                        className="form-control"
                        id="inputCountry"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="modal-footer justify-content-start">
                  <button type="submit" className="btn btn-primary px-5">
                    Submit
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
export default Address;
