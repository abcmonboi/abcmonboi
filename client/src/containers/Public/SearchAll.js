import React, { Fragment, memo, useState } from "react";
import { Outlet } from "react-router-dom";
import {Search} from "components";

const SearchAll = () => {
  return (
    <Fragment>
      <div id="content-page" className="content-page">
        <Search />
        <Outlet />
      </div>
    </Fragment>
  );
};

export default memo(SearchAll);
