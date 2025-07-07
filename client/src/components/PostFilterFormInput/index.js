import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import moment from "moment";
PostFilterFormInput.propTypes = {
  onSubmit: PropTypes.func,
};
PostFilterFormInput.defaultProps = {
  onSubmit: null,
};
function PostFilterFormInput(props) {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentDuration, setCurrentDuration] = useState();
  const typingTimeoutRef = useRef(null);
  function handleSearchTermChange(e) {
    const value = e.target.value;
    setCurrentDuration(value);
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
   
    <div className="col-lg-2 ">
    <div>
      <label htmlFor="customRange1">Duration</label>
      <input
        type="range"
        className="custom-range mt-2 "
        id="customRange1"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <div className="d-flex justify-content-between mt-2">
        <span>0:00</span>
        <span>
          {" "}
          {currentDuration
            ? moment(currentDuration * 6000).format("m:ss")
            : ""}
        </span>
        <span>10:00</span>
      </div>
    </div>
  </div>
  );
}

export default PostFilterFormInput;
