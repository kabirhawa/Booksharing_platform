import React from 'react'
import './Register.css'

const Register = () => {
  return (
<div className="Register-body">
<div className="container" >
    <div className="row" >
        <div className="col-md-offset-4col-md-5 text-center" >
            <h1 className='text-white'>SignUp Form</h1>
            
              <div className="form-login formlg">
                <h4>Secure Register</h4>
                
                <input className="form-control input-sm chat-input my-1"  placeholder="email" type="text" required />

                <input className="form-control input-sm chat-input my-1" placeholder="password" type="password"  required />
                <div className="wrapper">
                        <span className="group-btn">
                            <button href="#" type="submit"  className="btn btn-danger btn-md my-2">Register <i className="fa fa-sign-in"></i></button>
                        </span>
                </div>
                <h5>If you have already account click here, <a href="">Sign In</a></h5>

            </div>

        </div>
    </div>

    {/* <div className="footer text-white text-center">
        <p>© 2020 Unique Login Form. All rights reserved | Design by <a href="https://freecss.tech">Free Css</a></p>
    </div> */}
</div>
</div>
  )
}

export default Register
