import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CartProduct extends Component {
    state = {} 

    getClasses(){
        return this.props.product.count === 0
        ? 'badge bg-warning p-2' 
        : 'badge bg-primary p-2' ;
    }

    componentDidMount(){
        //For Calling Backend Server
        console.log("Product ===> componentDidMount")
    }

    componentWillUnmount(){
        //to get rid of a piece of info inside memory
        //close an open connection
        console.log("Product ===> componentWillUnmount")
    }

    render() { 
        console.log("Product ===> render")
        
        return (
            <React.Fragment>
            <div className="card shadow mb-3 ">
                <div className="card-body d-flex justify-content-between p-1 p-sm-3">
                    <div className='d-flex'>
                        <div className='d-none d-sm-inline'>
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                class="img-fluid rounded-3" alt="Shopping item" style={{width: '65px'}} />
                        </div>
                        <div class="ms-3 text-start">
                            <Link to={`/products/${this.props.product.id}`} className="text-decoration-none fs-6">{this.props.product.name}</Link>
                            <p class="small mb-0"><span className='mx-1'>{this.props.product.category.name}</span>from<span className='mx-1'>{this.props.product.brand.name}</span></p>
                        </div>
                    </div>

                    <div className="d-flex align-items-center">
                        <span role="button" onClick={()=>this.props.handleIncrementDecrementQuantity(this.props.product, '-')} className="fs-3 text-primary">-</span>
                        <p className="border border-secondary rounded px-3 mx-2 mt-4">{this.props.product.selectedQuantity}</p>
                        <span role="button" onClick={()=>this.props.handleIncrementDecrementQuantity(this.props.product, '+')} className="fs-3 text-primary">+</span>
                    </div>
                    <div className='d-flex align-items-center'>
                        <p className='p-0 mt-4'>{this.props.product.price} EGP</p>
                    </div>
                    <div className='d-flex align-items-center'>
                    <i role='button' onClick={()=>this.props.handleSelectProductToCart(this.props.product)} className="bi bi-trash3-fill fs-4 text-dark"></i>
                    </div>
                </div>
            </div>
            </React.Fragment>

        );
    }
}
 
export default CartProduct;