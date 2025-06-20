import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login, logout } from "./store/authSlice";
import authService from "./appwrite/auth";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(login({ userData: user }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      }
    };

    fetchUser();
  }, []);
  //doing this because when i reload redux store is cleared but appwrite still has the user logged in
  //so i get the user from appwrite and dispatch it to redux
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
