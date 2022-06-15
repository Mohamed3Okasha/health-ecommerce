import React from 'react';
import { Link } from 'react-router-dom';
import Login from './login';
import SignUp from './signUp';


const NavBarAdmin = (props) => {
    return ( 
        <nav className = "navbar navbar-expand-md navbar-dark bg-dark text-muted" >
            <div className = "container-fluid">
                
                <Link className="navbar-brand" to="/">Logo</Link>
                <button className = "navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav"
                    aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className = "navbar-toggler-icon"></span>
                </button>

                <div className = "collapse navbar-collapse" id="main-nav">
                    <div className = "navbar-nav me-auto mb-lg-2 ">
                        <Link className = "nav-link" aria-current="page" to="/">Home</Link>
                        {/* <Link className = "nav-link" to="#">About</Link> */}
                        <Link className = "nav-link " to="/">Contact</Link>
                        {/* <Link className = "nav-link" to="/cart"><span className="badge bg-primary p-1"> <i className="bi bi-cart-check lg fs-4"></i> {props.productCount} </span>  </Link> */}

                    </div>
                
                    {props.logedUser.name && 
                        <div className="d-flex justify-content-evenly ps-5">
                            <button type="button" className="btn btn-primary me-4">
                                Statistics
                            </button>

                            <Link to="/dashboard" role="button" className="btn btn-primary me-4">
                               Dashboard
                            </Link>

                            <Link to="/productform/new" role="button" className="btn btn-primary me-4">
                                Add Product
                            </Link>

                            <button type="button" className="btn btn-secondary me-4" onClick={props.handleLogout}>
                                Logout
                            </button>
                            <span className='text-white mt-1'>Welcome, {props.logedUser.name.split(' ')[0]}</span>
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
        </nav>
     );
}
 
export default NavBarAdmin;