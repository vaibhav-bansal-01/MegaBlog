import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth.js";
import { logout } from "../../store/authSlice.js";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return(
    <button 
    className=" px-5 py-2 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-all duration-300 "
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn;
