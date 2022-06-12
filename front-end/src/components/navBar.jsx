import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from './login';
import ShoppingCart from './shoppingCart';
import SignUp from './signUp';


const NavBar = (props) => {
    return ( 
        <nav className = "navbar navbar-expand-md navbar-dark bg-dark text-muted" >
            <div className = "container-fluid">
                <Link className="navbar-brand" to="/">Logo</Link>
                <button className = "navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav"
                    aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className = "navbar-toggler-icon"></span>
                </button>
                <div className = "collapse navbar-collapse justify-content-center" id="main-nav">
                    <div className = "navbar-nav me-auto mb-lg-2 ">
                        <Link className = "nav-link" aria-current="page" to="/">Home</Link>
                        {/* <Link className = "nav-link" to="#">About</Link> */}
                        <Link className = "nav-link " to="/">Contact</Link>
                        {/* <Link className = "nav-link" to="/cart"><span className="badge bg-primary p-1"> <i className="bi bi-cart-check lg fs-4"></i> {props.productCount} </span>  </Link> */}
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cartModal">
                            <span className="badge bg-primary p-1"> <i className="bi bi-cart-check lg fs-4"></i> {props.productCount} </span>
                        </button>
                        <ShoppingCart 
                            products = {props.products}
                            onReset = {props.handleReset}
                            onIncrement = {props.handleIncrement}
                            handleDelete = {props.handleCartDelete}
                        />

                    </div>
                
                    <div className="d-flex me-5">
                        
                        {/* <Link to="/register">
                            <button className="btn btn-primary me-3" type="submit">Sign Up</button>
                        </Link> */}
                        {props.logedUser.name && 
                            <div>
                                <button type="button" className="btn btn-secondary me-4" onClick={props.handleLogout}>
                                Logout
                                </button>
                                <span className='text-white'>Welcome, {props.logedUser.name}</span>
                            </div>
                        }
                        {!props.logedUser.name &&

                            <div>
                                <button type="button" className="btn btn-primary me-4" data-bs-toggle="modal" data-bs-target="#signupModal">
                                Sign Up
                            </button>
                            <SignUp />

                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
                                Login
                            </button>

                            <Login 
                            checkLoginDetails = {props.checkLoginDetails}
                            logedUser = {props.logedUser}
                            />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//   <div className="container-fluid">
//     <Link className="navbar-brand" to="#">Navbar</Link>
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//         <li className="nav-item">
//           <Link className="nav-link active" aria-current="page" to="#">Home</Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="#">Link</Link>
//         </li>
//         <li className="nav-item dropdown">
//           <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//             Dropdown
//           </Link>
//           <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
//             <li><Link className="dropdown-item" to="#">Action</Link></li>
//             <li><Link className="dropdown-item" to="#">Another action</Link></li>
//             <li><hr className="dropdown-divider"></hr></li>
//             <li><Link className="dropdown-item" to="#">Something else here</Link></li>
//           </ul>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link disabled" to="#" tabindex="-1" aria-disabled="true">Disabled</Link>
//         </li>
//       </ul>
//       <form className="d-flex">
//         <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"> </input>
//         <button className="btn btn-outline-success" type="submit">Search</button>
//       </form>
//     </div>
//   </div>
// </nav>
     );
}
 
export default NavBar;