import React from "react";
import MenuProduct from "./menuProduct";
import MenuProductAdmin from "./menuProductAdmin";

const Menu = (props) => {
  // let rowIterator = 1;
  return (
    <React.Fragment>
      <div className="container mb-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
          {props.userRole === "admin" &&
            props.products.map((p) => {
              return (
                <MenuProductAdmin
                  key={p._id}
                  product={p}
                  handleDeleteProduct={props.handleDeleteProduct}
                />
              );
            })}

          {(props.userRole === "" || props.userRole === "user") &&
            props.products.map((p) => {
              return (
                <MenuProduct
                  key={p._id}
                  product={p}
                  onAddProduct={props.handleSelectProductToCart}
                />
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Menu;
