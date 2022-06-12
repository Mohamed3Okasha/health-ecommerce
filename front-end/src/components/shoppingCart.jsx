import React, { Component } from 'react';
import Product from './product';


class ShoppingCart extends Component {
    closeCartRef = React.createRef();


    constructor(props){
        super(props);
        console.log("ShoppingCart ===> Constructor", this.props)
    }

    componentDidMount(){
        //For Calling Backend Server
        console.log("ShoppingCart ===> componentDidMount")
    }

    componentDidUpdate(prevProps, prevState){
        console.log("ShoppingCart ===> componentDidUpdate")
        console.log(prevProps)
    }

    render() { 
        console.log('ShoppingCart Props: ',this.props);
        if(this.props.products.length){
            console.log("ShoppingCart ===> render, this.props.products: ", this.props.products)

        return (
            <React.Fragment>
                <div className="modal fade" id="cartModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* <h5 className="modal-title" id="exampleModalLabel">Modal title</h5> */}
                            <button type="button" ref={this.closeCartRef} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {/* <div className="container"> */}
                        <div className="modal-body">
                            
                            <div className="container">
                                <div className="row">
                                    <div className="">
                                    {/* col-sm-8 */}
                                        {/* Reset Button */}
                                        {/* <button onClick={this.props.onReset} className="btn btn-secondary btn-sm p-2">Reset</button> */}
                                        {this.props.products.filter(p => p.isSelected === true).map((product) =>(
                                            <Product 
                                                key={product._id} 
                                                product = {product} 
                                                handleDelete={this.props.handleDelete}
                                                onIncrement = {this.props.onIncrement}
                                                />
                                        ))}
                                    </div>
                                    {/* <div className="col-sm-4">
                                        ...
                                    </div> */}
                                </div>
                            </div>
                            
                        </div>
                        <div className="modal-footer justify-content-start">
                            <button type="submit" className="btn btn-primary px-5">Confirm</button>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>

                
            </React.Fragment>
        );
    }

    }
}
 
export default ShoppingCart;