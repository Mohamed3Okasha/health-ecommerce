import React from "react";
import { useState } from "react";
import Menu from "./menu";


const Home = (props) => {

    let[searchWord, setSearchWord] = useState('');

    const handleInputChange = (e)=>{
        setSearchWord(e.target.value);
        props.handleSearchProducts(e.target.value)
    }

    const searchProducts = (e) => {
        e.preventDefault();
        props.handleSearchProducts(searchWord);
    }
    return ( 
        <React.Fragment>
            <h1>Home</h1>
            <form className="d-flex mx-auto mb-5 col-5" onSubmit={searchProducts}>
                <input 
                value = {searchWord}
                onChange = {handleInputChange}
                className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                {/* <button className="btn btn-secondary" type="submit">Search</button> */}
            </form>
            <Menu 
                userRole = {props.userRole}
                products = {props.products}
                handleSelectProductToCart = {props.handleSelectProductToCart}
                handleDeleteProduct = {props.handleDeleteProduct}
            />
        </React.Fragment>
     );
}
 
export default Home;