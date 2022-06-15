import React, { useRef } from 'react';
import { useState } from 'react';

const Payment = (props) => {
    const[cardFormDisable,setCardFormDisable] = useState('');
    let userImg = 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp';
    // userImg = '.';

    
    const handlePaymentMethodChange = e =>{
        console.log(e.target.value);
        e.target.value === 'ondelivery'? setCardFormDisable('disableForm') : setCardFormDisable('') ;
    }
    
    return ( 
        <React.Fragment>

        <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0">Payment Type</h5>
            <img src={userImg}
                className="img-fluid rounded-3" style={{width: '45px'}} alt="Avatar" />
            </div>
            
            
            <form className='mt-4'>
                <div className="d-flex ms-3">
                    <div className="form-group mb-4"  onChange={handlePaymentMethodChange}>
                        <input className="form-check-input me-1" type="radio" name="paymentOptions" id="card" value="card"/>
                        <label className="form-check-label me-5" for="card"> Credit Card</label>
                        <input className="form-check-input me-1" type="radio" name="paymentOptions" id="ondelivery" value="ondelivery"/>
                        <label className="form-check-label" for="ondelivery"> On Delivery</label>
                    </div>
                    {/* <div className="form-check form-check-inline">
                    </div> */}
                </div>
                <div className={cardFormDisable}>

                    <div className="form-group mb-4">
                    <input type="text" id="cardHolderName" className="form-control" siez="17"
                        placeholder="Cardholder's Name"/>
                    {/* <label className="form-label" for="cardHolderName">Cardholder's Name</label> */}
                    </div>

                    <div className="form-group mb-4">
                    <input type="text" id="cardNumber" className="form-control" siez="17"
                        placeholder="Card Number" minlength="19" maxlength="19" />
                    {/* <label className="form-label" for="cardNumber">Card Number</label> */}
                    </div>

                    <div className="row mb-4">
                    <div className="col-md-6">
                        <div className="form-group">
                        <input type="text" id="expDate" className="form-control"
                            placeholder="Expiration - MM/YYYY" size="7" minlength="7" maxlength="7" />
                        {/* <label className="form-label" for="expDate">Expiration</label> */}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                        <input type="password" id="typeText" className="form-control"
                            placeholder="CVV &#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3" />
                        {/* <label className="form-label" for="typeText">CVV</label> */}
                        </div>
                    </div>
                    </div>
                </div>
            </form>
            <hr /> 
            <div className="form-group mb-4">
                <input type="text" className='form-control' name="shippingAddress" id="inputShippingAddress" placeholder='Shipping Address' />
            </div>
            <hr />
            <div className='mx-3 fs-5'>
                <div className='d-flex justify-content-between'>
                    <p>Subtotal</p>
                    <p>{props.subTotal} EGP</p>
                </div>
                <div className='d-flex justify-content-between'>
                    <p>Shipping</p>
                    <p>30 EGP</p>
                </div>
                <div className='d-flex justify-content-between'>
                    <p>Total</p>
                    <p>{props.subTotal + 30} EGP</p>
                </div>
            </div>
            <hr />
            <button className="btn btn-info btn-lg text-white">Checkout <i className="bi bi-arrow-right"></i></button>
        </div>
        </React.Fragment>
     );
}
 
export default Payment;