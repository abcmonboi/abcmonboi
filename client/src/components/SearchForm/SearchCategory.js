import React, { memo } from "react";

const SearchCategory = ({ title, content }) => {
  return (
    <div className="d-inline-flex  ml-4 position-relative  ">
      <div>
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          // data-toggle="dropdown"
          // aria-haspopup="true"
          // aria-expanded="false"
        >
          <span className="font-weight-600">{title}</span>
        </button>
      </div>
    </div>
  );
};

export default memo(SearchCategory);
