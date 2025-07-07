import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
PostFilterForm.propTypes = {
  onSubmit: PropTypes.func,
};
PostFilterForm.defaultProps = {
  onSubmit: null,
};
function PostFilterForm(props) {

  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef(null);

  function handleSearchTermChange(e) {
    const value = e.target.value;

    setSearchTerm(e.target.value);

    if (!onSubmit) return;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: value,
      };

      onSubmit(formValues);
    }, 300);
  }
  return (
    // <form className="mr-3 position-relative">
    // <div className="form-group mb-0">
    //   <input
    //     type="search"
    //     value={searchTerm}
    //     onChange={handleSearchTermChange}
    //     className="form-control"
    //     id="exampleInputSearch"
    //     placeholder="Search..."
    //     aria-controls="user-list-table"

    //   />
    // </div>
    // </form>
    <div className="col-lg-2 ">
      <div>
        <label htmlFor="exampleInputText1">Artist </label>
        <input
          style={{
            border: "1px solid #e3e6f0",
            boxShadow: "none",
          }}
          type="text"
          value={searchTerm}
          className="form-control "
          id="exampleInputText1"
          placeholder="Enter Artist Name"
          onChange={handleSearchTermChange}
        />
      </div>
    </div>
  );
}

export default PostFilterForm;
