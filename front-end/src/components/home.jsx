import React from "react";
import Menu from "./menu";

const Home = (props) => {
    return ( 
        <React.Fragment>
            <h1>Home</h1>
            <form className="d-flex mx-auto mb-5 col-5">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                <button className="btn btn-secondary" type="submit">Search</button>
            </form>
            <Menu 
                userRole = {props.userRole}
                products = {props.products}
                handleSelect = {props.handleSelect}
                handleDeleteProduct = {props.handleDeleteProduct}

            />
        </React.Fragment>
     );
}
 
export default Home;