import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../menu";

const ManageProducts = (props) => {
  let [searchWord, setSearchWord] = useState("");

  const handleInputChange = (e) => {
    setSearchWord(e.target.value);
    props.handleSearchProducts(e.target.value);
  };

  const searchProducts = (e) => {
    e.preventDefault();
    props.handleSearchProducts(searchWord);
  };

  return (
    <React.Fragment>
      <div className="d-flex my-5 justify-content-evenly">
        <form className="col-5" onSubmit={searchProducts}>
          <input
            value={searchWord}
            onChange={handleInputChange}
            className="form-control me-2"
            type="search"
            placeholder="Search Existing Products"
            aria-label="Search"
          ></input>
          {/* <button className="btn btn-secondary" type="submit">Search</button> */}
        </form>

        <Link to="/productform/new" className="btn btn-primary">
          Add New Product
        </Link>
      </div>
      <Menu
        userRole={props.userRole}
        products={props.products}
        handleSelectProductToCart={props.handleSelectProductToCart}
        handleDeleteProduct={props.handleDeleteProduct}
      />
    </React.Fragment>
  );
};

export default ManageProducts;
