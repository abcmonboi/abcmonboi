import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../../ultils/constant";
import {FooterAdmin, Header,Sidebar} from "components";
import * as actions from "../../store/actions";
const Admin = () => {
  const { isLoggedIn} = useSelector((state) => state.auth);
  const [isLoading, setisLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {

    isLoggedIn && setTimeout(() => {
      dispatch(actions.getCurrentUser());
      }, 300);
// eslint-disable-next-line
  }, [isLoggedIn]);
  useEffect(() => {
    setTimeout(() => {

      setisLoading(false);
    }, 1000);
  }, []);


  if (!isLoggedIn ) return <Navigate to={path.SIGNIN} replace={true} />;
  if (isLoggedIn && +currentUser?.role === 1346 ) return <Navigate to={'*'}/>;
  // if (currentUser?.role === "user" ) {
  //   // navigate(path.HOME);
  //   // return <Navigate to={path.HOME} replace={true} />;
  // }

  


  return (
    <Fragment>
      {isLoading && (
        <div id="loading">
          <div id="loading-center"></div>
        </div>
      )}
      <Header />
      <Sidebar />
      <Outlet />
      <FooterAdmin />
    </Fragment>
  );
};

export default Admin;
