import { clone } from "joi-browser";
import React, { useRef } from "react";
import { useState } from "react";
import Address from "./address";

const Payment = (props) => {
  const [cardFormDisable, setCardFormDisable] = useState("disableForm");
  let userImg = "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp";
  // userImg = '.';

  const [paymentDetails, setPaymentDetails] = useState({
    cardHolderName: "",
    cardNumber: "",
    expDate: "",
    cardCVV: "",
    shippingAddress: "",
    shippingAddressId: "",
    onDelivery: true,
  });

  const handlePaymentMethodChange = (e) => {
    console.log(e.target.value);
    // e.target.value === 'ondelivery'? setCardFormDisable('disableForm') : setCardFormDisable('') ;
    let clonedPaymentDetails = { ...paymentDetails };
    if (e.target.value === "ondelivery") {
      setCardFormDisable("disableForm");
      clonedPaymentDetails.onDelivery = true;
    } else {
      setCardFormDisable("");
      clonedPaymentDetails.onDelivery = false;
    }
    setPaymentDetails(clonedPaymentDetails);
  };

  const handleInputChange = (e) => {
    let clonedPaymentDetails = { ...paymentDetails };
    clonedPaymentDetails[e.target.name] = e.target.value;
    if (e.target.name === "shippingAddress") {
      clonedPaymentDetails["shippingAddressId"] =
        props.addressList[e.target.selectedIndex - 1]._id;
    }
    setPaymentDetails(clonedPaymentDetails);
  };

  return (
    <React.Fragment>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">Payment Type</h5>
          <img
            src={userImg}
            className="img-fluid rounded-3"
            style={{ width: "45px" }}
            alt="Avatar"
          />
        </div>
        <form
          className="mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            props.handleOrderCheckout(paymentDetails);
          }}
        >
          <div className="d-flex ms-3">
            <div
              className="form-group mb-4"
              onChange={handlePaymentMethodChange}
            >
              <input
                className="form-check-input me-1"
                type="radio"
                name="paymentOptions"
                id="card"
                value="card"
              />
              <label className="form-check-label me-5" for="card">
                {" "}
                Credit Card
              </label>
              <input
                className="form-check-input me-1"
                type="radio"
                name="paymentOptions"
                id="ondelivery"
                value="ondelivery"
                defaultChecked
              />
              <label className="form-check-label" for="ondelivery">
                {" "}
                On Delivery
              </label>
            </div>
          </div>
          <div className={cardFormDisable}>
            <div className="form-group mb-4">
              <input
                onChange={handleInputChange}
                value={paymentDetails.cardHolderName}
                type="text"
                name="cardHolderName"
                id="cardHolderName"
                className="form-control"
                siez="17"
                placeholder="Cardholder's Name"
              />
            </div>

            <div className="form-group mb-4">
              <input
                onChange={handleInputChange}
                value={paymentDetails.cardNumber}
                name="cardNumber"
                type="text"
                id="cardNumber"
                className="form-control"
                siez="17"
                placeholder="Card Number"
                minlength="19"
                maxlength="19"
              />
            </div>

            <div className="row mb-4">
              <div className="col-md-6 mb-3 mb-sm-0">
                <div className="form-group">
                  <input
                    onChange={handleInputChange}
                    value={paymentDetails.expDate}
                    name="expDate"
                    type="text"
                    id="expDate"
                    className="form-control"
                    placeholder="Expiration - MM/YYYY"
                    size="7"
                    minlength="7"
                    maxlength="7"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    onChange={handleInputChange}
                    value={paymentDetails.cardCVV}
                    name="cardCVV"
                    type="password"
                    id="cardCVV"
                    className="form-control"
                    placeholder="CVV &#9679;&#9679;&#9679;"
                    size="1"
                    minlength="3"
                    maxlength="3"
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="form-group mb-4">
            {/* <input type="text" className='form-control' name="shippingAddress" id="inputShippingAddress" placeholder='Shipping Address' /> */}
            <select
              onChange={handleInputChange}
              value={paymentDetails.shippingAddress}
              name="shippingAddress"
              id="inputAddress"
              className="form-select"
            >
              <option value="nothing">Select an Address</option>
              {props.addressList.map((a) => (
                <option
                  key={a._id}
                  id={a._id}
                  value={a.street1 + ", " + a.street2 + ", " + a.city}
                >
                  {a.street1}, {a.street2}, {a.city}
                </option>
              ))}
            </select>
            <div className="d-flex justify-content-end mt-3">
              <button
                type="button"
                className="btn btn-primary border-dark "
                data-bs-toggle="modal"
                data-bs-target="#addAddressModal"
              >
                Add Address
              </button>
              <Address handleAddAddress={props.handleAddAddress} />
            </div>
          </div>
          <hr />
          <div className="mx-3 fs-5">
            <div className="d-flex justify-content-between">
              <p>Subtotal</p>
              <p>{props.subTotal} EGP</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Shipping</p>
              <p>30 EGP</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Total</p>
              <p>{props.subTotal + 30} EGP</p>
            </div>
          </div>
          <hr />
          <button
            type="submit"
            className="btn btn-warning border-dark btn-lg text-white"
          >
            Checkout <i className="bi bi-arrow-right"></i>
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Payment;
