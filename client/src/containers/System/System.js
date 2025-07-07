import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../../ultils/constant";
import {Header,Sidebar} from "components";
import * as actions from "../../store/actions";
const System = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isLoading, setisLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    isLoggedIn &&  setTimeout(() => {
    dispatch(actions.getCurrentUser());
    }, 300);
    // eslint-disable-next-line
  }, [isLoggedIn]);
  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 1000);
  }, []);
  // console.log(isLoggedIn);
  if (!isLoggedIn) return <Navigate to={path.SIGNIN} replace={true} />;

  return (
    <Fragment>
      {/* {isLoading && (
        <div id="loading">
          <div id="loading-center"></div>
        </div>
      )} */}
      <Header />
      <Sidebar />
      <Outlet />
   
    </Fragment>
  );
};

export default System;
