import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const MenuProduct = (props) => {
    // console.log(props.product)
    // console.log('props.product.images[0].image: ', props.product.images[0].image)
    // const iconClassName = props.product.isSelected === true? 'bi bi-cart-plus-fill fs-4' : 'bi bi-cart-plus fs-4';
    const addCartBtnClassName = props.product.isSelected === true? 'btn btn-danger mb-3' : 'btn btn-primary mb-3'

    // const[selectedCount, SetselectedCount] = useState(1);

    return ( 
        <React.Fragment>
            {/* <tr onClick={()=>{props.onSelect(props.product)}} id={props.product.id}>
                <th scope='row'>{props.product.id}</th>
                <td>{props.product.name}</td>
                <td>{props.product.price}</td>
                <td ><i className={iconClassName}></i></td>
            </tr> */}
            {/* <div className="row"> */}

            <div className="">
                 
            <div className="card mt-5" style={{"width": "100%"}}>
            <Link to={`/products/${props.product._id}`}>
                <img src={props.product.images[0]} className="card-img-top" alt="..." />
            </Link>
            <div className="card-body p-0 pt-1 d-flex flex-column justify-content-evenly align-items-center">
                <div className="d-flex justify-content-between">
                <p className='me-5'>{props.product.name}</p>
                <p>{props.product.price} EGP</p>
                </div>
                {/* <p onClick={()=>{props.onSelect(props.product)}}><i className={iconClassName}></i></p> */}
                <br />
                <button className={addCartBtnClassName} onClick={()=>{props.onAddProduct(props.product)}}>{props.product.isSelected === true? 'Remove from Cart' : 'Add to Cart'}</button>
                {props.product.isSelected && 
                <Link to='/cart' className="btn btn-warning mb-3 text-white">Proceed to Checkout</Link>
                }
                {/* <button className="btn btn-secondary">Proceed to checkout</button> */}

            </div>
            </div>
            </div>
            {/* </div> */}
        </React.Fragment>
     );
}
 
export default MenuProduct;

{/* <div className="row">
<div className="col-6 col-sm-6">
<p>{props.product.name}</p>
<p>{props.product.price} EGP</p>
</div>
<div className="col-6 col-sm-6">
<p onClick={()=>{props.onSelect(props.product)}}><i className={iconClassName}></i></p>
</div>
</div> */}