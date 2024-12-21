import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Nav = () => {
   const dispatch = useDispatch();
   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

   const handleLogout = () => {
      dispatch(logout());
   };

   return (
      <nav className="main-nav">
         <Link className="main-nav-logo" to="/">
            <img
               className="main-nav-logo-image"
               src="/img/argentBankLogo.jpg"
               alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
         </Link>
         <div>
            {isAuthenticated ? (
               <button
                  className="main-nav-item"
                  onClick={handleLogout}
                  style={{
                     background: "none",
                     border: "none",
                     color: "inherit",
                     cursor: "pointer",
                  }}
               >
                  <i className="fa fa-sign-out"></i>
                  Sign Out
               </button>
            ) : (
               <Link className="main-nav-item" to="/login">
                  <i className="fa fa-user-circle"></i>
                  Sign In
               </Link>
            )}
         </div>
      </nav>
   );
};

export default Nav;
