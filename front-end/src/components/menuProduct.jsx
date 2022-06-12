import React from 'react';
import { Link } from 'react-router-dom';

const MenuProduct = (props) => {
    // console.log(props.product)
    const iconClassName = props.product.isSelected === true? 'bi bi-cart-plus-fill fs-4' : 'bi bi-cart-plus fs-4';
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
            <div className="card-body p-0 pt-1 d-flex justify-content-evenly align-items-center">
                <div>
                <p>{props.product.name}</p>
                <p>{props.product.price} EGP</p>
                </div>
                <p onClick={()=>{props.onSelect(props.product)}}><i className={iconClassName}></i></p>
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