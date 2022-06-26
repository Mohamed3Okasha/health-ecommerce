import React, { Component } from "react";
import CartProduct from "./cartProduct";
import Payment from "./payment";

class ShoppingCart extends Component {
  closeCartRef = React.createRef();

  constructor(props) {
    super(props);
    console.log("ShoppingCart ===> Constructor", this.props);
  }

  componentDidMount() {
    //For Calling Backend Server
    console.log("ShoppingCart ===> componentDidMount");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("ShoppingCart ===> componentDidUpdate");
    console.log(prevProps);
  }

  render() {
    console.log("ShoppingCart Props: ", this.props);
    if (this.props.products.length) {
      console.log(
        "ShoppingCart ===> render, this.props.products: ",
        this.props.products
      );

      return (
        <React.Fragment>
          <div className="container my-5 bg-light p-3 border border-secondary rounded">
            <div className="row justify-content-center">
              <div className="col-sm-7 col-xl-6 text-center">
                {this.props.products
                  .filter(
                    (p) => p.isSelected === true && p.selectedQuantity > 0
                  )
                  .map((product) => (
                    <CartProduct
                      key={product._id}
                      product={product}
                      handleSelectProductToCart={
                        this.props.handleSelectProductToCart
                      }
                      handleIncrementDecrementQuantity={
                        this.props.handleIncrementDecrementQuantity
                      }
                    />
                  ))}
              </div>
              <div className="col-sm-5 col-xl-4  text-center">
                <div className="card bg-primary text-white rounded-3">
                  <Payment
                    subTotal={this.props.products
                      .filter((p) => p.isSelected === true)
                      .reduce(
                        (total, product) =>
                          total + product.price * product.selectedQuantity,
                        0
                      )}
                    handleAddAddress={this.props.handleAddAddress}
                    addressList={this.props.addressList}
                    handleOrderCheckout={this.props.handleOrderCheckout}
                  />
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default ShoppingCart;
