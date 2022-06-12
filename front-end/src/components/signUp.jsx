import React, {useState} from 'react';

const SignUp = () => {

    const[userRegister, setUserRegister] = useState({
        name:'',
        email:'',
        phone:'',
        age:'',
        password:'',
        confirmPassword:''
    })

    const[errors, setErrors] = useState({});

    const handleChange = e => {
        let cloneUserReg = {...userRegister};
        cloneUserReg[e.target.name] = e.target.value;
        setUserRegister(cloneUserReg);
        console.log(cloneUserReg);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const errors = validateRegisteration();
        if(!errors){
            //call backend
        }
        else{
            return;
        }
    }

    const validateRegisteration = () => {
        let error = {};
        const nameRegex = /^[A-Z][A-Za-z\s]{3,}[\.]{0,1}[A-Z][A-Za-z\s]{0,}$/;
        const emailRegex = /^\w+([\.-]?\w+)*@\w+[^.]([\-]?\w+)*(\.\w{2,})+$/;
        const phoneRegex = /[0][1][0-2,5][,0-9]{8}$/; //[0-2] equavielnt to => [^3-9]
        const ageRegex = /^\d{2,}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        // ^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$
        if(!nameRegex.test(userRegister.name.trim())){
            error.name = "Enter a valid Name, at least 3 characters";
        }
        if(!emailRegex.test(userRegister.email.trim())){
            error.email = "Enter a valid Email, example@ehealth.com";
        }
        if(!phoneRegex.test(userRegister.phone.trim())){
            error.phone = "Enter a valid mobile phone, 11 numbers in Egypt";
        }
        if(!ageRegex.test(userRegister.age.trim())){
            error.age = "Enter a correct age in numbers";
        }
        if(!passwordRegex.test(userRegister.password.trim())){
            error.password = "Enter a valild password, at leat 8 charcters, must include one number, one char, one special";
        }
        if(userRegister.confirmPassword.trim() !== userRegister.password.trim()){
            error.confirmPassword = "Please enter the same password";
        }
        console.log(error);
        setErrors(error);
        return Object.keys(error).length ? error : null;
    }

    return ( 
        // <React.Fragment>
        //     <div className="container">


        //     </div>
        // </React.Fragment>
    <React.Fragment>
        <div className="modal fade" id="signupModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                    <div className="container">
                        <form onSubmit={handleSubmit} className=' mx-auto'>
                        <div className="modal-body">
                        <div className="row row-cols-2">
                            <div className="mb-3 col-5 mx-auto">
                                <label htmlFor="inputName" className="form-label">Full Name</label>
                                <input 
                                    name="name"
                                    value = {userRegister.name}
                                    onChange={handleChange}
                                type="text" className="form-control" id="inputName" aria-describedby="emailHelp"></input>
                            </div>
                            <div className="mb-3 col-5 mx-auto">
                                <label htmlFor="inputEmail" className="form-label">Email address</label>
                                <input 
                                    name="email"
                                    value = {userRegister.email}
                                    onChange={handleChange}
                                type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                            </div>
                            
                            <div className="mb-3 col-5 mx-auto">
                                <label htmlFor="inputPhone" className="form-label">Phone Number</label>
                                <input 
                                    name="phone"
                                    value = {userRegister.phone}
                                    onChange={handleChange}
                                type="text" className="form-control" id="inputPhone"></input>
                            </div>
                            <div className="mb-3 col-5 mx-auto">
                                <label htmlFor="inputAge" className="form-label">Age</label>
                                <input 
                                    name="age"
                                    value = {userRegister.age}
                                    onChange={handleChange}
                                type="text" className="form-control" id="inputAge"></input>
                            </div>
                            <div className="mb-3 col-5 mx-auto">
                                <label htmlFor="inputPassword" className="form-label">Password</label>
                                <input 
                                    name="password"
                                    value = {userRegister.password}
                                    onChange={handleChange}
                                type="password" className="form-control" id="inputPassword"></input>
                            </div>
                            <div className="mb-3 col-5 mx-auto">
                                <label htmlFor="inputPasswordConfirm" className="form-label">Confrim Password</label>
                                <input 
                                    name="confirmPassword"
                                    value = {userRegister.confirmPassword}
                                    onChange={handleChange}
                                type="password" className="form-control" id="inputPasswordConfirm"></input>
                            </div>
                        </div>
                        </div>
                            <div className="modal-footer justify-content-start">
                                <button type="submit" className="btn btn-primary px-5">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
     );
}
 
export default SignUp;