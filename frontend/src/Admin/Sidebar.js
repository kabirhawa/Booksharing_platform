import React from 'react'
import Logo from "./bLogo.jpg"
const Sidebar = () => {
    return (
         <div className="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{backgroundColor:"black"}}>
            <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                <li className="nav-item mb-2 mt-3"><a className="nav-link text-secondary" href="#"><img
              src={Logo}
              alt=""
              width="30"
              height="28"
              className="d-inline-block align-text-top mx-1"
            /><h5>BookSharing Platform</h5></a></li>
                <li className="nav-item mb-2 "><a className="nav-link text-secondary" href="#"><i className="fa fa-user font-weight-bold"></i> <span className="ml-3">Dashboard</span></a></li>
                <li className="nav-item mb-2"><a className="nav-link text-secondary" href="#"><i className="fa fa-user font-weight-bold"></i> <span className="ml-3">User</span></a></li>
                <li className="nav-item mb-2"><a className="nav-link text-secondary" href="#"><i className="fa fa-book font-weight-bold"></i> <span className="ml-3">Books</span></a></li>
            </ul>
       </div>
    )
}
 
export default Sidebar