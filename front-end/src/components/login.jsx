import React, {useRef, useState} from 'react';
// import axios from 'axios';
// let prodAPI = 'https://healthecommerce.herokuapp.com';


const Login = (props) => {

    const [user, setUser] = useState({
        email:'',
        password:''
    })

    const [errors, setErrors] = useState({})

    const loginModalRef = useRef(null);
    const closeLoginBtnRef = useRef(null);
    const handleSubmitLogin = e =>{
        e.preventDefault();
        const error = validateLogin();
        if(!error){
            console.log('Login pressed');
            if(props.checkLoginDetails(user)){
                // console.log('login returned true');
            }
            if(props.logedUser){
                console.log('login returned true');
                closeLoginBtnRef.current.click();
            }
        }else{
            return;
        }
        // loginModalRef.current.className = "modal fade";
        // loginModalRef.current.style = "display: none"
    }

    const validateLogin = () => {
        const error = {};
        const emailRegex = /^\w+([\.-]?\w+)*@\w+[^.]([\-]?\w+)*(\.\w{2,})+$/;
        if(!emailRegex.test(user.email.trim())){
            error.email = "Email is not valid"
        }
        if(user.password.trim() === ''){
            // console.log('Empty Pass')
            error.password = "Password is required"
        }
        console.log(error);
        setErrors(error);

        return Object.keys(error).length === 0? null: error;
    }


    const handleChange = e =>{
        let userData = {...user}
        userData[e.target.name] = e.target.value;
        setUser(userData)
        console.log('handleChange pressed', user);
    }

    return ( 
        <React.Fragment>
            <div className="modal fade" ref={loginModalRef} id="loginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" ref={closeLoginBtnRef} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                            <form onSubmit={handleSubmitLogin} className='mx-auto col-9'>
                            <div className="container">
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="inputEmail" className="form-label">Email address</label>
                                        <input 
                                        value={user.email}
                                        onChange={handleChange}
                                        type="email" 
                                        name="email" 
                                        className="form-control" id="inputPassword" aria-describedby="emailHelp"/>
                                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                        { //show danger alert if there's no valid email
                                            errors.email &&
                                            <div className="alert alert-danger p-0 mt-1">{errors.email}</div>
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input 
                                        value={user.password}
                                        onChange={handleChange}
                                        type="password"
                                        name="password"
                                        className="form-control" id="exampleInputPassword1"/>
                                        {
                                            errors.password &&
                                            <div className="alert alert-danger p-0 mt-1">{errors.password}</div>
                                        }
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                                    </div>
                                </div>
                                <div className="modal-footer justify-content-start">
                                    <button type="submit" className="btn btn-primary px-5">Login</button>
                                </div>
                            </div>
                            </form>
                    </div>
                </div>
            </div>
            
        </React.Fragment>
     );
}
 
export default Login;